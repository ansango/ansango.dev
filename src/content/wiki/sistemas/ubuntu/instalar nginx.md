---
title: Instalar Nginx en Ubuntu
description: "Instalar Nginx en Ubuntu: configuración, firewall, server blocks, gestión del servidor y estructura de archivos"
date: 2024-05-25
mod: 2025-10-25
published: true
tags: [linux, nginx, platform, ubuntu]
---

# Instalar Nginx en Ubuntu

## Instalar Nginx

Nginx está disponible en los repositorios predeterminados de Ubuntu, es posible instalarlo desde estos repositorios utilizando el `apt`sistema de empaquetado.

```shell
sudo apt update
sudo apt install nginx
```

## Ajustar el firewall

Antes de probar Nginx, es necesario configurar el software de firewall para permitir el acceso al servicio. Nginx se registra como un servicio tras `ufw`la instalación, lo que facilita el acceso a Nginx.

```shell
sudo ufw app list
```

```shell
OutputAvailable applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
```

hay tres perfiles disponibles para Nginx:

- **Nginx Full** : este perfil abre tanto el puerto 80 (tráfico web normal sin cifrar) como el puerto 443 (tráfico cifrado TLS/SSL)
- **Nginx HTTP** : este perfil abre solo el puerto 80 (tráfico web normal sin cifrar)
- **Nginx HTTPS** : este perfil abre solo el puerto 443 (tráfico cifrado TLS/SSL)

Se recomienda que habilitar el perfil más restrictivo que permitirá el tráfico que has configurado. Por el momento, sólo necesitaremos permitir el tráfico en el puerto 80.

Para habilitar ejecuta:

```shell
sudo ufw allow 'Nginx HTTP'
```

Comprobamos el cambio:

```shell
sudo ufw status
```

```shell
OutputStatus: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere                  
Nginx HTTP                 ALLOW       Anywhere                  
OpenSSH (v6)               ALLOW       Anywhere (v6)             
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```

## Comprobar servidor web

Al final del proceso de instalación, Ubuntu 22.04 inicia Nginx. El servidor web ya debería estar funcionando. Podemos verificarlo de esta manera:

```shell
systemctl status nginx
```

```shell
Output● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2022-03-01 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   Memory: 3.5M
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```

Podemos comprobarlo también a través de nuestra dirección IP en el navegador:

```shell
http://your_server_ip
```

## Gestión del servidor

Para detener el servidor web, escribe:

```shell
sudo systemctl stop nginx
```

Para iniciar el servidor web cuando esté detenido, escribe:

```shell
sudo systemctl start nginx
```

Para detener y luego iniciar nuevamente el servicio, escribe:

```shell
sudo systemctl restart nginx
```

Si solo realizas cambios de configuración, Nginx a menudo puede recargar sin perder las conexiones. Para hacer esto, escribe:

```shell
sudo systemctl reload nginx
```

Nginx está configurado para iniciarse automáticamente cuando se inicia el servidor. Si quieres desactivarlo:

```shell
sudo systemctl disable nginx
```

Para volver a habilitar el servicio para que se inicie en el arranque, escribe:

```shell
sudo systemctl enable nginx
```

## Configurar Server Blocks

Cuando se utiliza el servidor web Nginx, se pueden usar *server blocks* para encapsular detalles de configuración y alojar más de un dominio desde un solo servidor.

Nginx en Ubuntu 22.04 tiene un bloque de servidor habilitado de forma predeterminada que está configurado para entregar documentos desde un directorio en `/var/www/html`. 

Esto funciona bien para un solo sitio, pero puede resultar difícil de manejar para varios sitios. En lugar de modificar `/var/www/html`, creamos una estructura de directorios dentro `/var/www`de nuestro sitio **your\_domain** , dejándola `/var/www/html`como el directorio predeterminado que se servirá si la solicitud de un cliente no coincide con ningún otro sitio.

Cree el directorio para **your\_domain** , usando el flag `-p` para crear los directorios principales necesarios:

```shell
sudo mkdir -p /var/www/your_domain/html
```

A continuación, asigna la propiedad del directorio con la `$USER`variable de entorno:

```shell
sudo chown -R $USER:$USER /var/www/your_domain/html
```

Para asegurarse de que tus permisos sean correctos y permitir que el propietario lea, escriba y ejecute los archivos mientras otorga solo permisos de lectura y ejecución a grupos y otros, puede ejecutar:

```shell
sudo chmod -R 755 /var/www/your_domain
```

A continuación, crea un`index.html` con `nano` o tu editor favorito:

```shell
nano /var/www/your_domain/html/index.html
```

```html:/var/www/your_domain/html/index.html
<html>
    <head>
        <title>Welcome to your_domain!</title>
    </head>
    <body>
        <h1>Success!  The your_domain server block is working!</h1>
    </body>
</html>
```

Guarda y cierra el archivo.

Para que Nginx sirva este contenido, es necesario crear un block server con las directivas correctas. 

En lugar de modificar el archivo de configuración predeterminado directamente, creemos uno nuevo en :`/etc/nginx/sites-available/your_domain`

```shell
sudo nano /etc/nginx/sites-available/your_domain
```

Pega el siguiente bloque de configuración, que es similar al predeterminado, pero actualizado para nuestro nuevo directorio y nombre de dominio:

```shell
server {
        listen 80;
        listen [::]:80;

        root /var/www/your_domain/html;
        index index.html index.htm index.nginx-debian.html;

        server_name your_domain www.your_domain;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

Observa que hemos actualizado la `root`configuración de nuestro nuevo directorio y `server_name`de nuestro nombre de dominio.

A continuación, habilitamos el archivo creando un enlace desde él al `sites-enabled`directorio, desde el cual Nginx lee durante el inicio:

```shell
sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/
```

Ahora hay dos server blocks habilitados y configurados para responder a solicitudes basadas en sus directivas `listen`y `server_name`

- `your_domain`: Responderá a las solicitudes de `your_domain`y `www.your_domain`.
- `default`: Responderá a cualquier solicitud en el puerto 80 que no coincida con los otros dos bloques.

Para evitar un posible problema de memoria del depósito hash que puede surgir al agregar nombres de servidores adicionales, es necesario ajustar un valor único en el `/etc/nginx/nginx.conf`archivo. Abre el archivo:

```shell
sudo nano /etc/nginx/nginx.conf
```

Busca la `server_names_hash_bucket_size`directiva y elimine el `#`símbolo para descomentar la línea. Si usas nano, puedes buscar rápidamente palabras en el archivo presionando `CTRL`y `w`.

```shell
…
http {
    …
    server_names_hash_bucket_size 64;
    …
}
…
```

Guarde y cierra el archivo.

A continuación, prueba para asegurarte de que no haya errores de sintaxis en ninguno de sus archivos Nginx:

```shell
sudo nginx -t
```

Si no hay ningún problema, reinicia Nginx para habilitar los cambios:

```shell
sudo systemctl restart nginx
```

Nginx ahora debería servir tu nombre de dominio. Puedes probar esto navegando a`http//:your_domain` 

## Archivos y directorios importantes de Nginx

### Contenido

- `/var/www/html`: El contenido web real, que de forma predeterminada solo consta de la página Nginx predeterminada que vio anteriormente, se sirve fuera del `/var/www/html`directorio. Esto se puede cambiar modificando los archivos de configuración de Nginx.

### Configuración del servidor

- `/etc/nginx`: El directorio de configuración de Nginx. Todos los archivos de configuración de Nginx residen aquí.

- `/etc/nginx/nginx.conf`: El archivo de configuración principal de Nginx. Esto se puede modificar para realizar cambios en la configuración global de Nginx.

- `/etc/nginx/sites-available/`: el directorio donde se pueden almacenar los bloques de servidor por sitio. Nginx no utilizará los archivos de configuración que se encuentran en este directorio a menos que estén vinculados al `sites-enabled`directorio. Normalmente, toda la configuración del bloque del servidor se realiza en este directorio y luego se habilita vinculándola al otro directorio.

- `/etc/nginx/sites-enabled/`: el directorio donde se almacenan los bloques de servidor habilitados por sitio. Normalmente, estos se crean vinculando a archivos de configuración que se encuentran en el `sites-available`directorio.

- `/etc/nginx/snippets`: este directorio contiene fragmentos de configuración que se pueden incluir en otras partes de la configuración de Nginx. Los segmentos de configuración potencialmente repetibles son buenos candidatos para refactorizarlos en fragmentos.

### Registros del servidor

- `/var/log/nginx/access.log`: Cada solicitud a su servidor web se registra en este archivo de registro a menos que Nginx esté configurado para hacer lo contrario.

- `/var/log/nginx/error.log`: Cualquier error de Nginx se registrará en este registro.
