# Setear una imagen base
FROM node:14

# Setear el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Copiar el código fuente del proyecto en el contenedor.
COPY . .

# Instalar dependencias globales y del proyecto
RUN npm install -g ts-node
RUN npm install -g typescript
RUN npm install

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 1337

# Comando para iniciar la aplicación
CMD ["npm", "start"]
