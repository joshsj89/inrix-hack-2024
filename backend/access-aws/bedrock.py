import boto3
from botocore.exceptions import ClientError
import os
from dotenv import load_dotenv

# Credit for structure: 
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

    imgBytes = request.data

# what_I_see: string paragraph, 
# You will receive an image. Return a single JSON object with this format: {string paragraph, 'is_there_trash': boolean, 'number_of_trash_found': int, 'trash_mappings': dictionary {trash_name: count_of_trash}} Do not say anything else.
    conversation = [
    {
        # "role": "system",
        # "content": [{
        #     "text": "You are an image-analyzing AI who will describe images given to you. Your primary goal is to report any trash found in the image. Search the image thoroughly and report even the smallest pieces of trash. When responding to images, return a single JSON format with this format: {'what_I_see': string paragraph, 'is_there_trash': boolean, 'number_of_trash_found': int, 'trash_mappings': dictionary {trash_name: count_of_trash}}. Limit your 'what_I_see' entry to one sentence. If the image is blurry or unintelligible, return the string 'UNKNOWN' and do not say anything else under any circumstances."
        # },],

        "role": "user",
        "content": [
            {
                 "text": "You are an image-analyzing AI who will describe images given to you. Your primary goal is to report any trash found in the image. Search the image thoroughly and report even the smallest pieces of trash. When responding to images, return a single JSON format with this format: {what_I_see: string paragraph, is_there_trash: boolean, number_of_trash_found: int, trash_mappings: dictionary {trash_name: count_of_trash}}. Limit your what_I_see entry to one sentence of under 20 words. If the image is blurry or unintelligible, return the string UNKNOWN. Do not say anything else!"
             },
            {
                "image": {"format": "jpeg", "source": {"bytes": imgBytes}}},
        ]
    }
    ]
    
    try:
        response = client.converse(
            modelId=model_id,
            messages=conversation,
            inferenceConfig={"maxTokens": 256, "temperature": 0, "topP": 0.8},
        )

        response_text = response["output"]["message"]["content"][0]["text"]
        print(response_text)
        return response_text
    except (ClientError, Exception) as e:
        print(f"ERROR: {e}")
        return "ERROR!"
