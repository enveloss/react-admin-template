import uvicorn 

def start_dev():
    uvicorn.run('app:app', reload=True)

def start_prod():
    uvicorn.run('app:app', host='0.0.0.0', port=80)