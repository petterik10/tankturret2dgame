FROM node as final

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm ci 

# Expose the port that the application listens on.
EXPOSE 5173

# Run the application.
CMD npm run dev