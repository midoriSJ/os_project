CREATE TABLE weather_data (
  id int PRIMARY KEY,            -- 날씨 ID
  city varchar(255),               -- 도시 이름
  temperature float,               -- 기온
  feels_like float,                  -- 체감온도
  temp_min float,                  -- 최저기온
  temp_max float,                  -- 최고기온
  humidity int,                     -- 습도
  pressure int,                     -- 기압
  wind_speed float,                  -- 풍속
  pm2_5 float,                     -- 초미세먼지
  pm10 float,                     -- 미세먼지
  description varchar(255)            -- 설명
);

create table board1 (                        -- 게시판 양식1
   writer_id int primary key,                  -- 작성자ID
   title1 varchar(200) not null,               -- 양식1 제목
   place1 varchar(200) not null,               -- 양식1 장소
   content1 text not null                     -- 양식1 내용
)

create table board2 (                        -- 게시판 양식2
   content_id int auto_increment primary key,      -- 양식2 게시글ID
   title2 varchar(200) not null,               -- 양식2 제목
   content2 text not null,                     -- 양식2 내용
   place2 varchar(200),                     -- 양식2 장소
   image longblob,                           -- 양식2 사진
   created_at timestamp default current_timestamp   -- 양식2 작성시간
)

create table board3 (                        -- 게시판 양식3
   content_id int auto_increment primary key,      -- 양식3 게시글ID
   title3 varchar(200) not null,               -- 양식3 제목
   content3 text not null,                     -- 양식3 내용
   place3 varchar(200),                     -- 양식3 장소
   image2 longblob                           -- 양식3 사진
)

-- 회원 정보 저장 테이블
create table user_info (
	user_id varchar(10) primary key,
	user_pw varchar(20) not null,
	name varchar(20) not null,
	birth date not null,
	phone int(12) not null,
	email varchar(30) not null
)

-- 회원 동의 여부 저장 테이블
CREATE TABLE user_agreements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    agree_all BOOLEAN NOT NULL,
    agree_naver BOOLEAN NOT NULL,
    agree_privacy BOOLEAN NOT NULL,
    agree_real_name BOOLEAN NOT NULL
);
