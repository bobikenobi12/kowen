FROM openjdk:17-jdk-slim
COPY target/Kowen-0.0.1-SNAPSHOT.jar /app.jar
ENV SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/kowenJava
ENV SPRING_DATASOURCE_USERNAME=sammy
ENV SPRING_DATASOURCE_PASSWORD=A4t474357oC5$77u5
CMD ["java", "-jar", "/app.jar"]