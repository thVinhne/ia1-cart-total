# BRIEF - IA#1: cartTotal

## 1. Mục tiêu

Implement hàm `cartTotal(items, options)` trong `src/cart.js` theo đặc tả
của starter README và tài liệu Session 2. Dùng JavaScript thuần, ESM,
không thêm dependencies. Viết tests kiểm tra hành vi bằng công cụ có sẵn
trong Node.js.

Trước khi thực hiện, đọc README và rules file của project (`AGENTS.md`
hoặc `CLAUDE.md`, tùy công cụ đang dùng). Xác nhận starter đã được chạy
`npm test` và thất bại vì `not implemented` trước khi viết implementation.

## 2. Phạm vi được phép thay đổi

Chỉ được sửa:

- `src/cart.js`: implement hàm, giữ named export `cartTotal` và hai tham số.
- `test/cart.test.js`: bổ sung tests; giữ test ví dụ và expected `467400`.

Không sửa README, package.json, rules file, format gate, workflow CI hoặc
tài liệu nộp bài trong vòng implement này. Không tạo thêm production files,
UI, API, database hoặc tính năng ngoài yêu cầu.

## 3. Contract: input, xử lý và output

### Input

- `items`: mảng các item có cấu trúc `{ name, price, qty }`.
- `options`: đối tượng `{ vatRate, freeShipFrom, shipFee }`.
- `name` là tên sản phẩm; không tham gia phép tính.
- `vatRate` là tỷ lệ VAT dạng thập phân, ví dụ `0.08` tương ứng 8%.

### Quy tắc tính tiền

1. Nếu `items` rỗng, trả ngay số `0`, không tính VAT hoặc shipping.
2. Kiểm tra giá và số lượng của từng item, kể cả item ở cuối mảng.
3. Tính `subtotal` bằng tổng `price * qty` của tất cả item.
4. Tính VAT bằng `subtotal * options.vatRate`.
5. Nếu `subtotal >= options.freeShipFrom`, shipping bằng `0`;
   ngược lại shipping bằng `options.shipFee`.
6. Trả `subtotal + VAT + shipping`, làm tròn đến nguyên đồng.

### Output

- Kiểu dữ liệu phải là `number`.
- Dùng `Math.round` trên tổng cuối cùng.
- Không làm tròn subtotal hoặc VAT riêng trước khi cộng.
- Ngưỡng miễn shipping dựa trên subtotal trước VAT và trước khi làm tròn.
- Giỏ rỗng vẫn trả `0` với ví dụ chỉ cung cấp `{ vatRate: 0.08 }`.

## 4. Error cases

- Nếu bất kỳ item nào có `price < 0`, ném `RangeError`.
- Nếu bất kỳ item nào có `qty` không phải số nguyên dương, ném `RangeError`.
  Các trường hợp gồm `0`, số âm, số thập phân và giá trị không phải số
  nguyên dương như chuỗi, `NaN` hoặc `Infinity`.
- Giá bằng `0` được phép.
- Không bắt rồi nuốt lỗi, trả `0` hoặc bỏ qua item sai để tiếp tục tính tiền.

Các dạng input/options sai khác không được đặc tả trong README nằm ngoài
phạm vi bài này. Không tự thêm defaults, ép kiểu hoặc tạo thêm error contract.

## 5. Worked example

```js
cartTotal(
  [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ],
  { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
)
```

Kết quả bắt buộc là số `467400`:

- Subtotal: `180000 * 2 + 45000 = 405000`.
- VAT: `405000 * 0.08 = 32400`.
- Shipping: `30000`, vì subtotal dưới `500000`.
- Tổng: `405000 + 32400 + 30000 = 467400`.

## 6. Tests cần có

Dùng `node:test` và `node:assert/strict`. Mỗi test tập trung vào một quy tắc,
kiểm tra hàm thật, dùng expected độc lập từ đặc tả; không mock cartTotal
và không lặp lại thuật toán implementation để tạo expected.

Với options `{ vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }`:

| Trường hợp | Expected |
| --- | --- |
| Worked example | `467400` |
| Giỏ rỗng | `0` |
| Subtotal `499999` | `569999`, vẫn tính shipping |
| Subtotal `500000` | `540000`, miễn shipping tại ngưỡng |
| Subtotal `500001` | `540001`, miễn shipping trên ngưỡng |
| Subtotal `480000` | `548400`, vẫn tính shipping dù subtotal + VAT vượt ngưỡng |
| Giá `-1` | `RangeError` |
| Qty `1.5` | `RangeError` |
| Qty `0` | `RangeError` |
| Qty `-1` | `RangeError` |
| Item sai nằm sau item hợp lệ | `RangeError` |
| Kiểu kết quả | `number` |

Bổ sung tests giỏ rỗng với chỉ `{ vatRate: 0.08 }`, giá bằng 0,
các quantity không phải số nguyên dương khác và làm tròn.
Ví dụ làm tròn: price `1.2`, qty `1`, vatRate `0.2`, freeShipFrom `100`,
shipFee `0.1` phải trả `2` vì tổng trước làm tròn là `1.54`.

## 7. Ràng buộc

- No dependencies: không cài package, kể cả devDependencies.
- Giữ JavaScript ESM và named export; không chuyển sang TypeScript.
- Không dùng `toFixed()` để trả tổng tiền vì nó trả về string.
- Không sửa hoặc bỏ tests để che lỗi implementation.
- Tuân thủ style và commands trong rules file của project.
- Giữ thay đổi nhỏ, dễ đọc và đủ để sinh viên giải thích từng dòng.

## 8. Quy trình và điều kiện hoàn thành

1. Nêu kế hoạch ngắn trước khi sửa code.
2. Thực hiện đúng phạm vi hai file được phép sửa.
3. Hiển thị diff để sinh viên đọc trước khi chạy code thay đổi.
4. Chạy `npm run format:check` và `npm test`, hoặc `npm run check`
   nếu project đã có script kết hợp hai lệnh.
5. Nếu có lỗi, sửa nguyên nhân theo đặc tả, hiển thị diff mới rồi kiểm tra lại.
6. Báo cáo file đã sửa, kết quả gates và phần còn hạn chế; không khẳng định
   đã chạy CI trên GitHub khi chỉ mới kiểm tra local.

Hoàn thành khi tất cả tests và format gate xanh, worked example trả đúng
số `467400`, không thêm dependencies và diff không vượt phạm vi.
Sinh viên tự đọc, hiểu và quyết định chấp nhận thay đổi; commit/push,
kiểm tra CI và ghi AI-LOG là các bước tiếp theo do sinh viên thực hiện.
