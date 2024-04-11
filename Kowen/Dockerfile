FROM openjdk:17-jdk-alpine3.14
COPY target/Kowen-0.0.1-SNAPSHOT.jar /app.jar
RUN mkdir -p /var/www/html
RUN chmod 777 /var/www/html
CMD ["java", "-jar", "/app.jar"]