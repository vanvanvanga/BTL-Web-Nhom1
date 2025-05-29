# Lưu ý cần đọc trước khi làm bài
## Hướng dẫn setup để làm việc chung trên 1 folder
Bước 1. Làm theo hướng dẫn trong file `11. Git.pdf` (gửi trong nhóm messenger) NHƯNG:
- Bỏ slide 9, 10
- Ở slide 11 thay lệnh git clone của thầy bằng lệnh:
```
git clone https://github.com/vanvanvanga/BTL-Web-Nhom1.git
```
* Nếu gặp vướng mắc gì có thể đọc thêm giải thích tại https://www.w3schools.com/git/default.asp?remote=github hoặc nhắn lên nhóm nhé :D
* Mình sẽ dùng git để upload các chỉnh sửa của mình lên folder chung và tải các chỉnh sửa người khác đã làm xuống nên mọi người học git nhé :D

Bước 2. 
Trong VSCode, mở folder project ra, mở Terminal (``Ctrl + Shift + ` ``) rồi gõ:
```
npm install
```

Bước 3. Sau khi chỉnh sửa xong --> để upload lên cloud
```
git add --all
git commit -a -m "nội dung tin nhắn"
git status 
git pull origin
git push origin
```

## Trong khi code
- Đọc chia việc ở file `REQUIREMENTS.md`
- Có gì mọi người có thể tham khảo tutorial của MDN: https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Express_Nodejs

## Cách xem các file .md
Bước 1. Mở file .md ra  
Bước 2. Bấm `Ctrl + K`  
Bước 3. Bấm `V`
* Lưu ý: Bước 2 và bước 3 làm tách biệt, không bấm `Ctrl + K + V` cùng một lúc