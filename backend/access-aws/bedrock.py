import boto3
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv

# https://medium.com/@codingmatheus/sending-images-to-claude-3-using-amazon-bedrock-b588f104424f
# import os
# import dotenv
# import boto3
import json
import base64

load_dotenv()

# Put your AWS credentials in a .env file
access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")

client = boto3.client(
    service_name="bedrock-runtime",
    aws_access_key_id=access_key_id,
    aws_secret_access_key=secret_access_key,
    region_name="us-west-2",
)

# The model ID for the model you want to use
model_id = "us.meta.llama3-2-90b-instruct-v1:0" 

# The message you want to send to the model
def invoke_bedrock(request):

    # conversation = [
    #     {
    #         "role": "user",
    #         "content": [{"text": user_message}],
    #     }
    # ]

    imgBytes = request.data

    with open('TRASH.jpeg', 'rb') as image_file:
        encoded_image = image_file.read()

    conversation = [
    {
        "role": "user",
        "content": [
            {
                "text": "You will receive an image. Return a single JSON object with this format: {what_I_see: string paragraph, 'is_there_trash': boolean, 'number_of_trash_found': int, 'trash_mappings': dictionary {trash_name: count_of_trash}} Do not say anything else."
            },
            {
                "image": {"format": "jpeg", "source": {"bytes": imgBytes}}},
        ]
    }
    ]
    

    # conversation = [
    #     {
    #         "role": "user",
    #         "content": [{
    #             "text": "You will receive an image. Return a single JSON object with this format: {what_I_see': string paragraph, 'is_there_trash': boolean, 'number_of_trash_found': int, 'trash_mappings': dictionary {trash_name: count_of_trash}} Do not say anything else."
    #         }]
    #     },
    #     {
    #         "role": "user",
    #         "content": [{
    #             "image": encoded_image
    #         }]
    #     }
    # ]

    # conversation = [
    #     {
    #         "role": "user",
    #         "content": [
    #             {
    #                 "type": "text",
    #                 "data": "You will receive an image. Return a single JSON object with this format: {what_I_see': string paragraph, 'is_there_trash': boolean, 'number_of_trash_found': int, 'trash_mappings': dictionary {trash_name: count_of_trash}} Do not say anything else."
    #             },
    #             {
    #                 "type": "image",
    #                 "data": encoded_image
    #             },

    #         ],
    #     }
    # ]

    try:
        response = client.converse(
            modelId=model_id,
            messages=conversation,
            inferenceConfig={"maxTokens": 512, "temperature": 0.5, "topP": 0.9},
        )

        response_text = response["output"]["message"]["content"][0]["text"]
        print(response_text)
        return response_text
    except (ClientError, Exception) as e:
        print(f"ERROR: {e}")
        return "ERROR!"
