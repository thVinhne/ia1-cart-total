# Project rules

Stack: Node.js 22+, JavaScript ESM, không thêm dependencies.

Style: indent 2 spaces, named exports, không có trailing spaces.

Commands:
- npm test
- npm run format:check

Tests: đặt trong test/, dùng node:test và node:assert/strict.

Never:
- Không thêm package.
- Không sửa test chỉ để làm cho test pass.
- Không trả tổng tiền dưới dạng string.
- Không sửa yêu cầu trong README.