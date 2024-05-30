#coding=utf-8

import socket
import select
import time
#import serial
import json
import time

#ip = '192.168.196.215'
ip = '192.168.20.27'
port = 6969 #nice

#SERIAL_PORT = "/dev/ttyACM0"


TIMEOUT_PER_RECV = 2

def read(conn_unreal):
    mess   = None
    
    pronto,_,errore = select.select([conn_unreal],[],[conn_unreal],1)
    if(not len(pronto)>0):
        return None
    mess = conn_unreal.recv(1024)
    
    if(len(errore)>0):
        print("Unreal errore")

    return mess
"""
arduino = serial.Serial(
	port = SERIAL_PORT,
	baudrate=9600,
	timeout=1
	)
arduino.reset_input_buffer()
"""
print ('Server Running at ', socket.gethostbyname(socket.gethostname())) 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM, )
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR,1)
s.bind((ip, port))

s.listen(2)

conn_nao = None
conn_unreal = None

while True:#aspetta che si connetta il NAO
    conn, addr = s.accept()
    hello = str(conn.recv(1024),"utf-8")
    
    print ('Connected by', addr)
    print(f"che si e identificato con: {hello}")
    
    if hello == "nao":#questo è il nao
        conn_nao = conn
        print("si è connesso il NAO")
    if hello == "unreal":
        conn_unreal = conn
        print("si è connesso il gioco")

    conn.setblocking(0)
    
    if(conn_nao and conn_unreal):#ho entrambe le connessioni
        break
print("entrambi connessi")
while True:

    #messaggio da unreal
    mess = read(conn_unreal)
    if(mess):#è arrivato un messaggio da unreal    
        conn_nao.send(mess)#quindi lo mando al NAO
        print("messaggio spedito a NAO")
        #poi apriamo il messaggio e vediamo se c'è un bidone da aprire
        #mess = str(mess, "utf-8")
        try:
            contenuto = json.loads(mess)
            print(str(contenuto))
            if 'bidone' in contenuto.keys():
                print("stiamo ap0.rendo il bidone: " + str(contenuto['bidone']))
               # arduino.write( bytes(contenuto['bidone'], 'utf-8'))
        except:
            print("ERRORE nel decodificare il json")
    else:
        print("Unreal si e staccato?")
    
        """print("aspettiamo una nuova connessione")
        conn, addr = s.accept()
        hello = str(conn.recv(1024))"""
        
    
        
    #controlla se arrivi un messaggio del NAO
    pronto = select.select([conn_nao],[],[],TIMEOUT_PER_RECV)
    if not pronto[0]:
        continue
    data = conn.recv(1024)
    #except socket.error:
     #   print("timeout")
    if not data: 
        print("Non è arrivato nulla, ora chiudo...")
        break
    print(f"Qui è arrivato: {data}")
print("sto per chiudere il socket")
conn.close()
s.close()
