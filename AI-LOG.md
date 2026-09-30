# AI-LOG.md - IA#1: cartTotal

- Họ và tên: **Lê Thái Vinh**
- MSSV: **24120157**
- Repository: https://github.com/thVinhne/ia1-cart-total

## 2026-09-30 - Làm IA#1 cartTotal với hỗ trợ của AI

**Tool:** ChatGPT / Codex trong ChatGPT Work mode.

**Asked for:** Đọc README, rubric và tài liệu buổi 2; hướng dẫn thiết lập
harness, gate và CI; soạn BRIEF.md; hoàn thiện cartTotal, tests và tài liệu
nộp bài. Sau đó tôi cung cấp MSSV, họ tên, repository và xác nhận giữ nguyên
code AI để hoàn thiện nhật ký và báo cáo tự đánh giá.

**Kept:** Tôi giữ nguyên implementation và tests AI cung cấp. Trong
`src/cart.js`, tôi giữ xử lý giỏ rỗng, kiểm tra giá/số lượng, tính subtotal,
VAT, shipping với điều kiện `>=` và `Math.round` tổng cuối. Trong
`test/cart.test.js`, tôi giữ 22 tests, gồm ví dụ 467400, giỏ rỗng, ngưỡng
shipping, RangeError, kiểu number và làm tròn. Tôi sử dụng brief, hướng dẫn
harness/CI và hai tài liệu nộp bài được AI hỗ trợ soạn.

**Changed:** Tôi không sửa code implementation hoặc tests do AI tạo ra.
Tôi đưa các nội dung được cung cấp vào project và thực hiện các thao tác
Git để lưu/push bài. Việc ghi tên tôi trong commit không có nghĩa là tôi
tự viết các dòng code đó. Lần cập nhật này bổ sung thông tin sinh viên,
repository và evidence CI vào tài liệu, không thay đổi code.

**Rejected:** Tôi không loại bỏ đoạn code hoặc đề xuất implementation nào.
Không có sửa đổi hay phương án bị loại bỏ cần khai báo.

**By hand:** Tôi thực hiện các thao tác trên project, chạy lệnh theo hướng
dẫn, commit/push các file và cung cấp thông tin sinh viên/repository.
Tôi không tự viết hoặc chỉnh sửa implementation và bộ tests. Không nhận
phần code hoặc brief do AI soạn là phần tự viết.

## Evidence và kết quả kiểm tra

- Harness được lưu ở commit
  [426f118](https://github.com/thVinhne/ia1-cart-total/commit/426f1188c2ef3786cabe63dfc860b32d769dce2e).
- Brief được lưu ở commit
  [4141350](https://github.com/thVinhne/ia1-cart-total/commit/41413509e291bcff5067e204664bc9998fde7c5c),
  trước implementation tại commit
  [1a18234](https://github.com/thVinhne/ia1-cart-total/commit/1a18234c45b0832e527258ba7f950d80df8fd0cd).
- CI tại commit `aa1e02540e6ed83d5e1fcc683b88b3d334085c95` đã hoàn thành
  thành công: [Cart checks - run 36731200188](https://github.com/thVinhne/ia1-cart-total/actions/runs/36731200188).
- Khi kiểm tra bản clone của repository, trợ lý chạy `npm run check`:
  format gate xanh, **22 tests pass, 0 fail**. Trợ lý cũng thử gate với
  lỗi tab trong một bản sao tạm và xác nhận exit code 1; không sửa code
  trong repository để thực hiện phép thử này.

## Thời điểm cập nhật và trách nhiệm

Nhật ký được hoàn thiện trong cùng buổi làm bài ngày 2026-09-30, sau khi
implementation đã được commit. File ở commit `e4cd2a7` còn trống; tôi không
khẳng định entry này đã được ghi ở commit đó hoặc ghi lùi thời gian.
Trợ lý soạn nội dung nhật ký/báo cáo theo xác nhận của tôi về việc giữ
nguyên code AI. Tôi chịu trách nhiệm với bài nộp và cần hiểu, giải thích
được code trên lớp; không xem việc tests xanh là bằng chứng tự viết code.
