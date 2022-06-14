from channels.db import database_sync_to_async
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']

        self.chat_room = f'chat_room_{self.user.username}'
        
        await self.channel_layer.group_add(
            self.chat_room,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data=None, bytes_data=None):
        event = json.loads(text_data)
        message = event.get('message')

        other_username = event.get('send_to')
        other_user_chatroom = f'chat_room_{other_username}'
        
        response = {
            "message":message,
            "send_by":self.user.username,
            "sent_to":other_username
        }

        await self.channel_layer.group_send(
            other_user_chatroom,
            {
                "type":"chat_message",
                "text":json.dumps(response),
            }
        )
        await self.channel_layer.group_send(
            self.chat_room,
            {
                "type":"chat_message",
                "text":json.dumps(response),
            }
        )
    
    async def disconnect(self, code):
        await self.channel_layer.group_discard(
            self.chat_room,
            self.channel_name
        )
        return await super().disconnect(code)

    async def chat_message(self,event):
        text = event['text']
        await self.send(text_data=text)

