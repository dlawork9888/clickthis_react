##### 1. 빌드 환경 설정
FROM node:alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


##### 2. 프로덕션 환경 설정
FROM nginx:alpine as production-stage
# nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/nginx.conf
# 빌드 스테이지에서 빌드된 앱 가져오기
COPY --from=build-stage /app/build /usr/share/nginx/html
# 3002번 포트에서 nginx를 실행
EXPOSE 3002
CMD ["nginx", "-g", "daemon off;"]