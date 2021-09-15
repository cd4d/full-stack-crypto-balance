from rest_framework.views import exception_handler
from rest_framework.response import Response
import json 
def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data['status_code'] = response.status_code
        response = Response(
            json.dumps( response.data),
            content_type="application/json", status=response.status_code
        )
    return response
