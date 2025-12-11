
openssl req -nodes -new -x509 \
    -keyout ./cert/server.key \
    -out ./cert/server.cert \
    -days 365
