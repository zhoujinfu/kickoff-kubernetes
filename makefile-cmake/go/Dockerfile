FROM golang:latest as builder
ENV GO111MODULE=on \
    GOPROXY=https://goproxy.cn,direct
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 make all
RUN mkdir publish
RUN mv hello publish/
RUN cp -r assets publish

FROM scratch
WORKDIR /app
COPY --from=builder /app/publish .
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/cert
EXPOSE 80
ENTRYPOINT ["./hello"]