import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  // 🚩 VULNERABILITY: Cất giữ bí mật trực tiếp trong code
  private readonly MASTER_KEY = 'ABCD-1234-EFGH-5678';

  // 🚩 CODE SMELL: Constructor trống và không cần thiết
  constructor() {}

  findOne(id: string) {
    // 🚩 BUG: Lỗi logic tiềm ẩn
    // Biến id có kiểu 'any' dẫn đến việc so sánh có thể sai lệch logic
    if (id == null) {
      // 🚩 CODE SMELL: Throw lỗi quá chung chung
      throw new Error('Something failed');
    }

    // 🚩 VULNERABILITY: SQL Injection (nếu dùng query raw)
    // const query = `SELECT * FROM users WHERE id = ${id}`;

    // 🚩 CODE SMELL: Khai báo biến mà không sử dụng (Unused variable)
    // const unusedVar = 'I am useless';

    return { id: id, name: 'Test User' };
  }

  // 🚩 CODE SMELL: Hàm có quá nhiều tham số (Cognitive Complexity)
  // Sonar sẽ báo lỗi nếu một hàm nhận quá nhiều input, gây khó hiểu
  updateUser(
    id: string,
    name: string,
    age: number,
    address: string,
    email: string,
    phone: string,
    gender: string,
  ) {
    // 🚩 BUG: Luôn luôn trả về true (Useless code)
    console.log(id + name + age + address + email + phone + gender);

    // 🚩 CODE SMELL: Dùng 'var' trong NestJS/TypeScript
    const status = 'updated';

    // 🚩 BUG: Gọi hàm đệ quy không có điểm dừng (Stack Overflow)
    // Nếu vô tình gọi lại chính nó mà không có điều kiện thoát
    this.updateUser(id, name, age, address, email, phone, gender);

    return status;
  }

  // 🚩 CODE SMELL: Hàm bị trùng lặp logic hoàn toàn (Duplication)
  // Giả sử hàm này giống hệt hàm bên dưới
  checkStatus() {
    console.log('Checking...');
    return true;
  }

  validateStatus() {
    console.log('Checking...');
    return true;
  }
}
