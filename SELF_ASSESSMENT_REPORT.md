# SELF_ASSESSMENT_REPORT.md - IA#1: cartTotal

- Họ và tên: **Lê Thái Vinh**
- MSSV: **24120157**
- Ngày: **2026-09-30**
- Repository: https://github.com/thVinhne/ia1-cart-total
- Commit code đã kiểm tra: `aa1e02540e6ed83d5e1fcc683b88b3d334085c95`
- CI thành công: https://github.com/thVinhne/ia1-cart-total/actions/runs/36731200188

## Tự đánh giá theo rubric

| STT | Tiêu chí | Tối đa | Điểm tự chấm | Evidence và lý do |
| --- | --- | ---: | ---: | --- |
| 1 | cartTotal behaves as specified | 30 | 30 | `src/cart.js` xử lý giỏ rỗng bằng 0, kiểm tra mọi item, ném RangeError cho giá âm/qty không nguyên dương, tính VAT từ subtotal, miễn shipping với `subtotal >= freeShipFrom`, làm tròn tổng cuối bằng Math.round và trả number. `test/cart.test.js`: `the example from the slides` trả 467400; các tests ngưỡng, giỏ rỗng, lỗi và kiểu kết quả đều xanh trong CI nêu trên. |
| 2 | Tests | 20 | 20 | `test/cart.test.js` có 22 tests riêng, dùng node:test và node:assert/strict trên hàm thật. Có ví dụ, empty cart, dưới/bằng/trên ngưỡng, hai nhóm RangeError, qty 0/âm/thập phân, item sai ở cuối và làm tròn. Expected là các kết quả cụ thể theo đặc tả, không mock cartTotal hoặc tính expected bằng bản sao thuật toán. `npm run check` trên bản clone: 22 pass, 0 fail; bước Run tests của CI thành công. |
| 3 | The harness | 20 | 19 | `AGENTS.md` có Node/ESM, style, commands và Never. `package.json` có test, format:check, check. `scripts/check-format.js` kiểm tra tabs, trailing spaces, newline cuối file và trả exit 1 khi có lỗi; đã kiểm chứng bằng lỗi tab trong bản sao tạm. `.github/workflows/ci.yml` chạy format và tests trên push/pull_request; CI run 36731200188 thành công. Chưa nhận điểm tối đa vì gate chỉ kiểm tra định dạng cơ bản của hai file source/test, chưa kiểm tra rộng hơn toàn project hoặc lint JavaScript. |
| 4 | The brief | 15 | 15 | `BRIEF.md`: mục 2 giới hạn file được sửa; mục 3 nêu input/output và công thức; mục 4 nêu RangeError; mục 6 nêu tests; mục 7 ghi no dependencies; mục 8 nêu validation. Commit `4141350` lưu brief trước commit implementation `1a18234`, đối chiếu được trong lịch sử Git. |
| 5 | AI-LOG.md | 15 | 14 | `AI-LOG.md` nêu rõ Tool, Asked for, Kept, Changed, Rejected và By hand. Khai báo giữ nguyên code AI, không sửa hoặc loại bỏ implementation/tests, phân biệt thao tác Git với tự viết code; có evidence tới source/tests/commits/CI. Chưa nhận điểm tối đa vì nhật ký chỉ được hoàn thiện sau commit implementation; file ở commit `e4cd2a7` còn trống, thời điểm cập nhật được khai báo rõ. |
| | **Tổng** | **100** | **98** | **30 + 20 + 19 + 15 + 14 = 98** |

## What I did not manage

- Chưa xây dựng gate định dạng/lint đầy đủ cho toàn bộ project. Gate hiện
  kiểm tra tabs, trailing spaces và newline cuối file trong `src/cart.js`
  và `test/cart.test.js`.
- Chưa ghi đủ nội dung AI-LOG ở commit log ban đầu; đã hoàn thiện trong
  lần cập nhật này và không ghi lùi thời gian.
- Không tự viết hoặc chỉnh sửa implementation/tests. Tôi giữ nguyên code
  AI và khai báo rõ trong AI-LOG; trách nhiệm hiểu và giải thích code vẫn
  thuộc về tôi. Rubric không trừ điểm chỉ vì mức sử dụng AI cao.

## Tên file nộp

`24120157_98.zip`

Tổng trong tên ZIP phải bằng tổng bảng tự đánh giá. Bài nộp gồm repository,
brief, AI-LOG.md và SELF_ASSESSMENT_REPORT.md. Báo cáo được ChatGPT/Codex
hỗ trợ soạn từ rubric, repository và xác nhận của sinh viên; sinh viên cần
đọc và xác nhận điểm trước khi nộp. CI được dẫn ở đây kiểm tra commit code
nêu trên; sau khi cập nhật hai tài liệu, cần kiểm tra run mới nhất của lần
push cuối.
