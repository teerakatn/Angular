# My First App (Angular Workshop)

โปรเจกต์นี้เป็นแอป Angular แบบ Standalone Components สำหรับฝึกใช้งาน Angular หลายหัวข้อในโปรเจกต์เดียว เช่น Routing, Template-driven Form, Reactive Form, Signal, API GET/POST และการจัดการ Error กลางทั้งระบบ

เวอร์ชันหลัก:
- Angular CLI 21.1.3
- Angular Standalone API
- RxJS

## ภาพรวมการทำงาน

แอปนี้มีหน้า (feature) หลักดังนี้
- Home: คำนวณพื้นที่วงกลม/สามเหลี่ยมแบบพื้นฐาน
- Student: แสดงรายการนักเรียนและ Progress Bar ที่อัปเดตได้
- Shape: เดโม Angular Signals + computed + effect
- Form Template: ฟอร์มแบบ Template-driven
- Form Reactive: ฟอร์มแบบ Reactive + Validators
- API GET: ดึงรายการสินค้าจาก API แล้วแสดงตาราง
- API POST: ส่งข้อมูลสินค้าไป API แล้วแสดงผลลัพธ์
- About: แสดงข้อมูลผู้พัฒนาและตัวอย่างการโต้ตอบกับรูปภาพ

## จุดเด่นของโครงสร้างโค้ด

- ใช้ Lazy Load Components ใน Routing เพื่อแบ่งโหลดโค้ดตามหน้า
- ใช้ ChangeDetectionStrategy.OnPush ในหลายคอมโพเนนต์เพื่อลดงาน Change Detection
- แยก Data Access ไปไว้ที่ service กลาง
- มี HTTP Interceptor สำหรับ timeout/retry/map ข้อความ error
- มี Global Alert กลางสำหรับแสดงข้อความผิดพลาดจากระบบ
- แยก environment สำหรับ production/development

## วิธีรันโปรเจกต์

1) ติดตั้ง dependencies

```bash
npm install
```

2) รันในโหมดพัฒนา

```bash
ng serve
```

เปิดเบราว์เซอร์ที่ http://localhost:4200

3) สร้างไฟล์ build

```bash
ng build
```

4) รัน unit tests

```bash
ng test --watch=false
```

## โครงสร้างไฟล์สำคัญและหน้าที่

### 1) ระดับแอป (App Shell)

- src/app/app.ts
	- Root component ของระบบ
	- รวม Header, Global Alert และ RouterOutlet
	- ใช้ OnPush

- src/app/app.html
	- โครงหลักของหน้า: header + alert + เนื้อหาตาม route

- src/app/app.config.ts
	- ลงทะเบียน providers ระดับแอป
	- ผูก Router กับ routes
	- ผูก HttpClient พร้อม interceptor

- src/app/app.routes.ts
	- รวมเส้นทางจาก feature.routes
	- มี wildcard route เพื่อ redirect ไป /home

- src/app/features/feature.routes.ts
	- กำหนด route ของแต่ละหน้าแบบ lazy load ด้วย loadComponent

### 2) Core (แกนกลางของระบบ)

- src/app/core/data-access/product.service.ts
	- รวม logic ติดต่อ API สินค้า
	- มี 2 เมธอดหลัก:
		- getProducts(): ดึงรายการสินค้า
		- addProduct(product): เพิ่มสินค้า
	- อ่าน base URL จาก environment

- src/app/core/interceptors/http-error.interceptor.ts
	- ดักทุก HTTP request/response
	- เพิ่ม timeout = 10 วินาที
	- retry 1 ครั้งเมื่อผิดพลาด
	- แปลงสถานะ error เป็นข้อความที่อ่านง่าย
	- ส่งข้อความไป ErrorNotificationService

- src/app/core/services/error-notification.service.ts
	- เก็บข้อความผิดพลาดแบบ signal
	- มี show(message) และ clear()

### 3) Shared Components

- src/app/shared/components/global-alert/global-alert.ts
	- คอมโพเนนต์แจ้งเตือนกลางทั้งระบบ
	- อ่านข้อความจาก ErrorNotificationService
	- ปิดแจ้งเตือนได้

- src/app/shared/components/global-alert/global-alert.html
	- แสดงกล่องแจ้งเตือนเมื่อมี message

- src/app/shared/components/global-alert/global-alert.css
	- สไตล์แถบแจ้งเตือน sticky ด้านบน

### 4) Header และ Navigation

- src/app/header/header.ts
	- ควบคุมเมนูแบบ responsive
	- ใช้ signal menuOpen
	- ปิดเมนูอัตโนมัติเมื่อ route เปลี่ยน

- src/app/header/header.html
	- แสดงลิงก์นำทางทุกหน้า
	- มี aria-* เพื่อการเข้าถึง (a11y)

- src/app/header/header.css
	- สไตล์ header, nav, mobile toggle

### 5) Feature Components

- src/app/home/home.ts
	- คำนวณพื้นที่วงกลม/เส้นรอบวง/พื้นที่สามเหลี่ยม
	- มีเมธอด clearData ล้างค่า

- src/app/student/student.ts
	- แสดงข้อมูลนักเรียนในอาร์เรย์
	- รับ event จาก ProgressBar เพื่ออัปเดตเปอร์เซ็นต์

- src/app/progress-bar/progress-bar.ts
	- คอมโพเนนต์ progress bar แบบ reusable
	- รับค่า @Input และส่งค่าเปลี่ยนผ่าน @Output

- src/app/shape/shape.ts
	- เดโม Signals:
		- selectedShape, radius, base, height เป็น signal
		- circleArea, triangleArea เป็น computed
		- effect ใช้ติดตามการเปลี่ยนแปลงและ reset ค่า

- src/app/form-template/form-template.ts
	- ฟอร์มแบบ Template-driven
	- ใช้ ngModel เก็บข้อมูลผู้ใช้

- src/app/form-reactive/form-reactive.ts
	- ฟอร์มแบบ Reactive
	- ใช้ FormBuilder + Validators
	- markAllAsTouched เมื่อฟอร์มไม่ valid

- src/app/api-get/api-get.ts
	- เรียก ProductService.getProducts()
	- ใช้ signal สำหรับ products/loading/error
	- ใช้ finalize เพื่อปิด loading เสมอ

- src/app/api-post/api-post.ts
	- ส่งฟอร์มไป ProductService.addProduct()
	- เก็บ response และ error ด้วย signal

- src/app/about/about.ts
	- เก็บข้อมูลติดต่อ
	- มีเมธอดแสดงรายละเอียดรูปภาพผ่าน alert

### 6) Environment และ Config

- src/environments/environment.ts
	- ค่าสำหรับ production (production: true)

- src/environments/environment.development.ts
	- ค่าสำหรับ development (production: false)

- angular.json
	- ตั้งค่า build/test
	- ตั้ง file replacement ให้ dev ใช้ environment.development.ts

### 7) Tests

- ไฟล์ *.spec.ts ในแต่ละคอมโพเนนต์/บริการ
	- ใช้ทดสอบการสร้างคอมโพเนนต์และพฤติกรรมพื้นฐาน
	- ตัวอย่าง service spec ใช้ provideHttpClientTesting

## ภาพการไหลของข้อมูล (Data Flow)

1) ผู้ใช้กด action ในหน้า (เช่น API GET/API POST)
2) Component เรียก ProductService
3) HttpClient ส่ง request ผ่าน httpErrorInterceptor
4) ถ้า error -> interceptor ส่งข้อความเข้า ErrorNotificationService
5) GlobalAlert อ่าน message และแสดงผลบนทุกหน้า

## หมายเหตุเพิ่มเติม

- โฟลเดอร์ dist/ เป็นผลลัพธ์จาก build และถูกตั้งค่า ignore สำหรับงาน version control
- หากต้องการเพิ่มหน้าใหม่ ให้เพิ่ม route ใน src/app/features/feature.routes.ts

---

หากต้องการ README เวอร์ชัน “ละเอียดระดับบรรทัดโค้ด” (อธิบาย method ต่อ method ของทุกไฟล์) สามารถต่อยอดจากเอกสารนี้ได้ทันที โดยแยกเพิ่มเป็นเอกสาร developer guide อีกไฟล์ เช่น docs/DEVELOPER_GUIDE.md
