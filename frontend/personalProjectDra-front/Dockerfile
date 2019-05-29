# Partimos de GOLANG 1.12
FROM node:10

# Creamos una carpeta en el contenedor llamada "app"
RUN mkdir /app

# Indicamos que la carpeta "app" va a ser nuestro espacio de trabajo, por lo tanto
# no posicionamos dentro de ella
WORKDIR /app

# Ejecutamos los test del codigo que existan
RUN npm install -g @angular/cli 

# Copiamos todo lo que haya (incluido subdirectorios) en la ubicacion
# donde esté el dockerfile en la carpeta APP
COPY . .

# Exponemos la aplicación en el puerto 5002 
# (primer parametro el puerto a exponer fuera del contenedor y el segundo parametro el puerto en el que está expuesta en el contenedor)
EXPOSE 4200:4200