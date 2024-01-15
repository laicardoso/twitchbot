import socket
import re

# Configurações do bot
server = 'irc.chat.twitch.tv'
port = 6667
nickname = 'seu_bot'
token = 'seu_token'  # Token de autenticação da Twitch
channel = '#seu_canal'  # Canal que o bot irá participar

# Conexão com o servidor IRC da Twitch
sock = socket.socket()
sock.connect((server, port))
sock.send(f"PASS {token}\n".encode('utf-8'))
sock.send(f"NICK {nickname}\n".encode('utf-8'))
sock.send(f"JOIN {channel}\n".encode('utf-8'))

# Loop principal do bot
while True:
    resp = sock.recv(2048).decode('utf-8')

    # Ping/Pong para manter a conexão ativa
    if resp.startswith('PING'):
        sock.send("PONG\n".encode('utf-8'))

    # Responder a comandos do chat
    if re.match(r'^:([^!]+)![^@]+@[^\.]+\.tmi\.twitch\.tv PRIVMSG ' + nickname, resp):
        username = re.search(r'^:([^!]+)', resp).group(1)
        message = re.search(r'PRIVMSG {} :(.+)'.format(nickname), resp).group(1)

        # Verificar se o comando é válido
        if message.startswith('!'):
            command = message.split(' ')[0][1:]

            # Executar comandos específicos
            if command == 'comando1':
                # Lógica para o comando1
                response = 'Resposta do comando1'

            elif command == 'comando2':
                # Lógica para o comando2
                response = 'Resposta do comando2'

            else:
                # Comando desconhecido
                response = 'Comando desconhecido'

            # Enviar resposta para o chat
            sock.send(f"PRIVMSG {channel} :{response}\n".encode('utf-8'))

        # Adicionar novos comandos
        elif message.startswith('!addcom') and username == 'seu_nome_de_usuario':
            new_command = message.split(' ')[1]
            response = ' '.join(message.split(' ')[2:])
            
            # Lógica para adicionar o novo comando

            # Enviar mensagem de confirmação
            sock.send(f"PRIVMSG {channel} :Novo comando adicionado: !{new_command}\n".encode('utf-8'))
