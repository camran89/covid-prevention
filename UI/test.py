def errorHandling(value):
    print(value)
    # print(value['message'])
    print( 'message' in value)
    if isinstance(value,dict):
        if hasattr(value,'message') and value['message']=='Internal server error':
            return True
    return False

some_value={'messages': 'Internal server error'}

print (errorHandling(some_value))