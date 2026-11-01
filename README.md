# 🦉 Đố Vui Cùng Bé

Trò chơi học tập cho học sinh **lớp 1, 2, 3**, gồm hơn 100 trò ở 3 mức độ (🌱 Dễ, 🌿 Vừa, 🌳 Khó). Đây là trang web tĩnh, chạy được trên Safari của iPhone, không cần cài đặt, đăng nhập hay máy chủ riêng.

## Có gì trong trò chơi

Mỗi lớp có thực đơn riêng, chia theo môn. Mỗi lớp cũng có số ⭐ và bộ hình dán riêng, nên anh chị em dùng chung một máy vẫn không lẫn kết quả.

| Môn | Lớp 1 | Lớp 2 | Lớp 3 |
|---|---|---|---|
| 📖 Tiếng Việt | Ghép chữ, viết đúng, đánh vần, vần, dấu thanh, c/k – g/gh – ng/ngh, bảng chữ cái, nối chữ với hình, hái vần, điền từ, xếp câu, đọc hiểu | Chính tả, từ chỉ sự vật – hoạt động – đặc điểm, kiểu câu, dấu câu, từ trái nghĩa, xếp câu, đọc hiểu | Chính tả, so sánh, câu kể – hỏi – khiến – cảm, đặt câu hỏi, dấu câu, tục ngữ, xếp câu, đọc hiểu |
| 🔢 Toán | Đếm, cộng trừ không nhớ đến 100, so sánh, chục và đơn vị, bảng số, hình phẳng và hình khối, đo cm, giờ đúng, thứ trong tuần, vị trí | Cộng trừ có nhớ, số đến 1000, bảng 2 và 5, giờ phút, tiền Việt Nam, đo lường, đường gấp khúc, một phần mấy, biểu đồ tranh, toán có lời văn | Bảng 3 đến 9, nhân chia nhiều chữ số, số đến 100 000, biểu thức, gấp giảm số lần, tìm thành phần, chu vi diện tích, đơn vị đo, xem giờ đến phút, số La Mã, bảng số liệu |
| 🌿 Khám phá | Cơ thể, gia đình, trường học, cây, con vật, an toàn | Cơ quan vận động – hô hấp – bài tiết, môi trường sống, bầu trời, Việt Nam quê em | Cơ quan tiêu hoá – tuần hoàn – thần kinh, Trái Đất, sản xuất, lịch sử và địa lí, Tin học |
| 💛 Đạo đức | Tình huống ứng xử theo từng lớp | | |
| 🧩 Đố vui | Câu đố, đoán bóng, tìm hình lạ, quy luật, trí nhớ, lật hình, nhớ chuỗi, rô-bốt tìm đường | Thêm câu đố dân gian, từ khác nhóm | Thêm câu đố dân gian, từ khác nhóm |
| 🔤 Tiếng Anh | Làm quen từ vựng qua hình | Làm quen từ vựng qua hình | Từ vựng và mẫu câu |

Nội dung bám theo Chương trình Giáo dục phổ thông 2018 và mạch kiến thức của bộ sách **Kết nối tri thức với cuộc sống**, bộ sách dùng thống nhất toàn quốc từ năm học 2026–2027. Câu hỏi và đoạn văn là bài tự viết, không chép từ sách giáo khoa. Đây là tài liệu ôn luyện, không phải sản phẩm của Bộ Giáo dục và Đào tạo hay nhà xuất bản.

## Nghe hướng dẫn: bật hoặc tắt

Trên trang chủ có công tắc **Nghe hướng dẫn**. Mặc định là **Tắt** để bé tự đọc.

- **Tắt:** máy không đọc gì, và nút nghe trong trò chơi cũng được ẩn đi.
- **Bật:** máy tự đọc lời dặn của từng câu, và có nút **🔊 Nghe lại hướng dẫn**. Máy không đọc đáp án, đoạn văn đọc hiểu hay phần đánh vần, để bé vẫn phải tự đọc.

Công tắc chỉ có ở trang chủ, không có trong lúc chơi, để bé không tiện tay bật lên. Máy nào chưa có giọng tiếng Việt thì tải thêm trong **Cài đặt → Trợ năng → Nội dung được đọc → Giọng nói** (iPhone).

## Thư mục gồm những gì

```
index.html             khung trang
style.css              giao diện
data/                  ngân hàng câu hỏi theo lớp (muốn thêm câu thì sửa ở đây)
js/loi.js              lõi trò chơi, các trò Đánh vần và Đố vui của lớp 1
js/co-che.js           cơ chế chơi: trắc nghiệm, điền từ, xếp câu, nối cặp, phân loại, đọc hiểu…
js/tro-choi.js         Nhớ chuỗi, Rô-bốt tìm đường
js/toan.js             công cụ Toán dùng chung và Toán lớp 1
js/toan-lop2.js        Toán lớp 2
js/toan-lop3.js        Toán lớp 3
js/menu.js             thực đơn theo lớp, trang chủ, hình dán
manifest.webmanifest   thông tin để "Thêm vào Màn hình chính"
*.png                  biểu tượng
.nojekyll              báo GitHub Pages phục vụ file nguyên trạng
```

## Mở trang chơi bằng GitHub Pages

GitHub Pages miễn phí chỉ chạy với repo **công khai**. Khi đó ai có đường link cũng chơi được và xem được mã nguồn. Trong các file không có thông tin cá nhân nào.

1. Vào **Settings → General**, kéo xuống **Danger Zone**, chọn **Change visibility → Make public**.
2. Vào **Settings → Pages**. Ở *Build and deployment* chọn **Deploy from a branch**, **Branch: main**, thư mục **/ (root)**, rồi bấm **Save**.
3. Khoảng 1–2 phút sau, trang chơi sẽ có ở địa chỉ `https://<tên-tài-khoản>.github.io/do-vui-cung-be/`.

## Chơi trên iPhone

1. Mở đường link bằng **Safari**.
2. Bấm nút **Chia sẻ** (ô vuông có mũi tên), chọn **Thêm vào Màn hình chính**.
3. Biểu tượng “Đố vui” sẽ hiện trên màn hình chính.

**Lưu ý**

- **Số ⭐ và hình dán:** lưu riêng trên từng máy và từng trình duyệt. Đổi máy hoặc xoá dữ liệu Safari thì đếm lại từ đầu.
- **Âm thanh hiệu ứng:** iPhone đang ở chế độ im lặng thì có thể không nghe thấy.
- **Hình emoji:** hiển thị theo máy. Máy quá cũ có thể không có vài hình mới.

## Thêm câu hỏi

Mở file trong `data/` và thêm một dòng cùng dạng với các dòng đã có. Không cần sửa mã chương trình. `lv` là mức độ (1 Dễ, 2 Vừa, 3 Khó).

```js
/* trắc nghiệm: data/lop1-kham-pha.js, CAU_HOI.tnxh1 */
{lv:1, e:"🦷", q:"Câu hỏi?", a:"Đáp án đúng", w:["Đáp án sai 1","Đáp án sai 2","Đáp án sai 3"], why:"Lời giải thích."},

/* điền từ: dấu ___ là chỗ trống */
{lv:1, e:"🐱", s:"Con mèo ___ chuột.", a:"bắt", w:["bay","bơi"], why:"Mèo bắt chuột."},

/* xếp câu: các mảnh cách nhau bằng dấu | */
{lv:1, s:"Bé|đi|học."},
```

Sửa xong thì tăng số `?v=` trong `index.html` để iPhone tải bản mới, rồi commit và push. GitHub Pages tự cập nhật sau khoảng 1–2 phút.

### Thêm từ cho góc Đánh vần

Trong `js/loi.js`, tìm `W1_RAW` (từ một tiếng) và `W2_RAW` (từ hai tiếng). Mỗi mục có dạng `emoji tên`, cách nhau bằng dấu `|`. Khi thêm từ mới, cần lưu ý:

- **Emoji không được trùng** với emoji đã có trong kho.
- **Tránh từ mà hai miền gọi khác nhau**, ví dụ hoa/bông, kính/kiếng, vở/tập. Nếu không, bé có thể đánh vần đúng theo tiếng nhà mình mà vẫn bị tính sai.
- **Tránh vần mở “oa”, “oe”, “uy”** như *hoà*, *thuý*, vì có hai cách đặt dấu.

### Cách đọc âm trong phần “Đọc đánh vần”

Bảng `SOUND` trong `js/loi.js` quy định cách đọc âm đầu. Hiện tại `k` đọc là “ca” và `gi` đọc là “di”. Nếu cô giáo của bé dạy khác, chỉ cần sửa giá trị trong bảng này.
