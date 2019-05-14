FROM golang:1.12

RUN mkdir /app

WORKDIR /app

COPY . .

RUN go mod download && \
    go install ./cmd/hmis

EXPOSE 5002:5002

CMD ["hmis"]