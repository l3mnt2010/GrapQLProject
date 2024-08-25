# #!/bin/ash

# # Tạo thư mục cần thiết và thay đổi quyền sở hữu
# mkdir -p /run/mysqld
# chown -R mysql:mysql /run/mysqld

# # Cài đặt cơ sở dữ liệu MySQL
# mysql_install_db --user=mysql --ldata=/var/lib/mysql

# # Khởi động MySQL
# mysqld --user=mysql --console --skip-name-resolve --skip-networking=0 &

# # Chờ MySQL khởi động
# while ! mysqladmin ping -h'localhost' --silent; do echo "not up" && sleep .2; done

# # Tạo cơ sở dữ liệu và chèn dữ liệu vào đó
# mysql -u root << EOF
# CREATE DATABASE IF NOT EXISTS on_tap_khoa_hoc;

# USE on_tap_khoa_hoc;

# -- Tạo bảng nếu chưa tồn tại
# CREATE TABLE IF NOT EXISTS cauhoi (
#   id int NOT NULL AUTO_INCREMENT,
#   noi_dung text NOT NULL,
#   mon_id int DEFAULT NULL,
#   PRIMARY KEY (id),
#   KEY mon_id (mon_id)
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

# CREATE TABLE IF NOT EXISTS khoahoc (
#   id int NOT NULL AUTO_INCREMENT,
#   ten_khoa varchar(255) NOT NULL,
#   PRIMARY KEY (id)
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

# CREATE TABLE IF NOT EXISTS monhoc (
#   id int NOT NULL AUTO_INCREMENT,
#   ten_mon varchar(255) NOT NULL,
#   khoa_id int DEFAULT NULL,
#   PRIMARY KEY (id),
#   KEY khoa_id (khoa_id)
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

# CREATE TABLE IF NOT EXISTS phuongan (
#   id int NOT NULL AUTO_INCREMENT,
#   noi_dung text NOT NULL,
#   dung tinyint(1) NOT NULL,
#   cau_hoi_id int DEFAULT NULL,
#   PRIMARY KEY (id),
#   KEY cau_hoi_id (cau_hoi_id)
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

# CREATE TABLE IF NOT EXISTS users (
#   id int NOT NULL AUTO_INCREMENT,
#   username varchar(255) NOT NULL,
#   password varchar(255) NOT NULL,
#   admin int NOT NULL DEFAULT '0',
#   token text,
#   refreshToken text,
#   PRIMARY KEY (id),
#   UNIQUE KEY username (username)
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

# -- Tạo dữ liệu ngẫu nhiên cho bảng users
# INSERT INTO users (username, password, admin, token, refreshToken) VALUES
# $(for i in $(seq 1 40); do
#   username="user${i}"
#   password="password${i}"
#   admin=$(($i % 2))  # 0 hoặc 1 cho quyền admin
#   token="null"
#   refreshToken="null"
#   echo "('$username', '$password', $admin, '$token', '$refreshToken')"
# done | paste -sd, -);

# -- Tạo khối học và môn học
# $(for k in $(seq 1 5); do
#   khoahoc="AT$(printf "%02d" $k)"
#   echo "INSERT INTO khoahoc (ten_khoa) VALUES ('$khoahoc');"
#   khoa_id=$(mysql -u root -D on_tap_khoa_hoc -se "SELECT id FROM khoahoc WHERE ten_khoa='$khoahoc';")
#   for m in $(seq 1 10); do
#     monhoc="Môn ${khoahoc} - ${m}"
#     echo "INSERT INTO monhoc (ten_mon, khoa_id) VALUES ('$monhoc', $khoa_id);"
#     mon_id=$(mysql -u root -D on_tap_khoa_hoc -se "SELECT id FROM monhoc WHERE ten_mon='$monhoc';")
#     for q in $(seq 1 30); do
#       question="Câu hỏi ${monhoc} - ${q}"
#       echo "INSERT INTO cauhoi (noi_dung, mon_id) VALUES ('$question', $mon_id);"
#       cau_hoi_id=$(mysql -u root -D on_tap_khoa_hoc -se "SELECT id FROM cauhoi WHERE noi_dung='$question';")
#       for a in $(seq 1 4); do
#         is_correct=$(($a == $(($RANDOM % 4 + 1))) ? 1 : 0)
#         echo "INSERT INTO phuongan (noi_dung, dung, cau_hoi_id) VALUES ('Đáp án ${a}', $is_correct, $cau_hoi_id);"
#       done
#     done
#   done
# done | paste -sd, -);

# -- Cấp quyền truy cập
# GRANT ALL ON on_tap_khoa_hoc.* TO 'myuser'@'%' IDENTIFIED BY 'mypassword' WITH GRANT OPTION;
# FLUSH PRIVILEGES;
# EOF


# /usr/bin/supervisord -c /etc/supervisord.conf