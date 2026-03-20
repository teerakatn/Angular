# Developer Guide (Method by Method)

เอกสารนี้อธิบายโค้ดเชิงลึกระดับ method ต่อ method ของโปรเจกต์ Angular Workshop
เน้นว่าไฟล์ไหนมีหน้าที่อะไร, method ทำงานอย่างไร, และข้อมูลไหลผ่านระบบแบบใด

## 1) ภาพรวมสถาปัตยกรรม

โปรเจกต์ใช้แนวทาง Standalone Components + Lazy Route Loading
โดยแบ่งบทบาทหลักดังนี้

- App Shell
  - วางโครงหน้าเว็บหลักและจุดแสดงผล route
- Feature Components
  - รวมหน้าฟังก์ชันใช้งานจริง เช่น Home, Shape, Form, API
- Core
  - เก็บ logic ที่ใช้ข้ามหลายหน้า เช่น service, interceptor, error state
- Shared
  - คอมโพเนนต์ใช้ร่วม เช่น global alert
- Environments
  - กำหนด config ตามสภาพแวดล้อม

## 2) Bootstrap และ App Config

### File: src/main.ts

- bootstrapApplication(App, appConfig)
  - เริ่มแอปโดยใช้ App เป็น root component
  - โหลด provider ทั้งหมดจาก appConfig
- catch((err) => console.error(err))
  - ดัก error ระดับ bootstrap

### File: src/app/app.config.ts

- appConfig.providers
  - provideRouter(routes)
    - ลงทะเบียนระบบ routing ทั้งแอป
  - provideHttpClient(withInterceptors([httpErrorInterceptor]))
    - ลงทะเบียน HttpClient
    - ใส่ interceptor กลางเพื่อจัดการ timeout/retry/error mapping

### File: src/app/app.routes.ts

- routes
  - กระจายเส้นทางจาก featureRoutes
  - wildcard route: redirect ไป /home เมื่อ path ไม่ตรง

### File: src/app/features/feature.routes.ts

- featureRoutes
  - นิยาม route ของแต่ละหน้า
  - ทุก route ใช้ loadComponent เพื่อ lazy load

## 3) App Shell และ Navigation

### File: src/app/app.ts

Class: App

- ไม่มี method ภายใน class
- หน้าที่คือเป็น root shell ที่ import
  - RouterOutlet
  - Header
  - GlobalAlert
- ใช้ ChangeDetectionStrategy.OnPush

### File: src/app/app.html

- วางโครง shell ตามลำดับ
  - app-header
  - app-global-alert
  - router-outlet

### File: src/app/header/header.ts

Class: Header

Properties
- router
  - inject(Router) เพื่อฟัง event เปลี่ยนเส้นทาง
- menuOpen
  - signal<boolean> สำหรับสถานะเมนู mobile

Constructor
- constructor()
  - subscribe router.events
  - filter เฉพาะ NavigationEnd
  - เมื่อ route เปลี่ยน จะปิดเมนูอัตโนมัติด้วย menuOpen.set(false)
  - ใช้ takeUntilDestroyed() เพื่อ cleanup subscription อัตโนมัติ

Methods
- toggleMenu(): void
  - กลับสถานะเปิด/ปิดเมนู
- closeMenu(): void
  - ปิดเมนูทันที

## 4) Core Layer

### File: src/app/core/data-access/product.service.ts

Interface: Product
- โครงข้อมูลสินค้า: id, title, price, category

Class: ProductService

Properties
- http
  - inject(HttpClient)
- apiUrl
  - base URL จาก environment.apiBaseUrl + /products
- getApiUrl
  - endpoint สำหรับ GET โดยจำกัด field และ pagination
- postApiUrl
  - endpoint สำหรับ POST เพิ่มสินค้า

Methods
- getProducts(): Observable<{ products: Product[] }>
  - ส่ง GET request ไป getApiUrl
  - คืน observable ของรายการสินค้า
- addProduct(product: Product): Observable<Product>
  - ส่ง POST request ไป postApiUrl
  - body คือสินค้าใหม่

### File: src/app/core/interceptors/http-error.interceptor.ts

Function: httpErrorInterceptor

Flow
- รับ request แล้วส่งต่อผ่าน next(req)
- timeout(REQUEST_TIMEOUT_MS)
  - ถ้าเกินเวลา 10 วินาทีให้ถือว่าล้มเหลว
- retry({ count: 1, delay: 300 })
  - retry 1 ครั้ง
- catchError(...)
  - แปลง error เป็นข้อความที่ผู้ใช้เข้าใจได้
  - status 0: ปัญหาเชื่อมต่อ
  - status 404: ไม่พบข้อมูล
  - status >= 500: ปัญหาระบบปลายทาง
  - จากนั้นเรียก ErrorNotificationService.show(message)
  - โยน error ต่อด้วย throwError

### File: src/app/core/services/error-notification.service.ts

Class: ErrorNotificationService

Properties
- message
  - signal<string | null> เก็บข้อความแจ้งเตือนปัจจุบัน

Methods
- show(message: string): void
  - เซ็ตข้อความแจ้งเตือน
- clear(): void
  - ล้างข้อความแจ้งเตือน

## 5) Shared Component

### File: src/app/shared/components/global-alert/global-alert.ts

Class: GlobalAlert

Properties
- errorNotification
  - inject(ErrorNotificationService)
- message
  - computed(() => errorNotification.message())
  - ผูกข้อมูลแจ้งเตือนให้ template แสดงผลแบบ reactive

Methods
- close(): void
  - เรียก service.clear() เพื่อลบแจ้งเตือน

## 6) Feature: Home

### File: src/app/home/home.ts

Class: Home

Properties
- selectedShape, radius, circleArea, circumference
- base, height, triangleArea

Methods
- calculateCircleData()
  - คำนวณพื้นที่วงกลม = pi * r^2
  - คำนวณเส้นรอบวง = 2 * pi * r
  - ปัดเศษทศนิยม 2 ตำแหน่ง
- calculateTriangleData()
  - คำนวณพื้นที่สามเหลี่ยม = 0.5 * base * height
  - ปัดเศษทศนิยม 2 ตำแหน่ง
- clearData()
  - รีเซ็ตค่าทั้งหมดเป็น 0

## 7) Feature: About

### File: src/app/about/about.ts

Class: About

Properties
- size
- initialYear, copyrightYear
- developerName, address, telephone

Methods
- displayContactInfo()
  - คืน string สรุปข้อมูลผู้พัฒนา
- aboutImageInfo()
  - คืน string ข้อมูลขนาดรูป
- alertImageInfo()
  - เรียก alert() เพื่อแสดง aboutImageInfo()

## 8) Feature: Student + Progress Bar

### File: src/app/student/student.ts

Class: Student

Properties
- studentParticipation
  - อาร์เรย์ข้อมูลนักเรียนและค่า participationPercent

Methods
- onProgressUpdated(ev: any)
  - รับ event จาก ProgressBar
  - อ่าน ev.trackId และ ev.progress
  - หา student ตาม id แล้วอัปเดตค่า participationPercent

### File: src/app/progress-bar/progress-bar.ts

Class: ProgressBar

Inputs
- trackId, progress, color, height, showLabel

Outputs
- progressChanged
  - EventEmitter<{ trackId, progress }>

Methods
- updateProgress(progressValue: number)
  - เพิ่ม progress ทีละ 5
  - จำกัดไม่ให้เกิน 100 ด้วย Math.min
  - emit ค่ากลับไป parent ผ่าน progressChanged

## 9) Feature: Shape (Signals)

### File: src/app/shape/shape.ts

Class: Shape

Signals
- selectedShape: circle | triangle | null
- radius, base, height

Computed
- circleArea
  - คำนวณจาก radius
- triangleArea
  - คำนวณจาก base และ height

Constructor effects
- effect #1
  - เมื่อ selectedShape เปลี่ยน ให้ reset radius/base/height
- effect #2
  - เมื่อเลือกวงกลมและค่าพื้นที่เปลี่ยน ให้ log ค่า circleArea
- effect #3
  - เมื่อเลือกสามเหลี่ยมและค่าพื้นที่เปลี่ยน ให้ log ค่า triangleArea

Methods
- updateRadius(event)
  - อ่านค่าจาก input และ set radius
- updateBase(event)
  - อ่านค่าจาก input และ set base
- updateHeight(event)
  - อ่านค่าจาก input และ set height

## 10) Feature: Forms

### File: src/app/form-template/form-template.ts

Class: FormTemplateComponent

Properties
- user
  - object เก็บ firstName, lastName, username, password

Methods
- onSubmit()
  - log ข้อมูล user
  - แสดง alert ว่าลงทะเบียนสำเร็จ (template-driven)

### File: src/app/form-reactive/form-reactive.ts

Class: FormReactiveComponent

Properties
- fbuild
  - inject(FormBuilder)
- regForm
  - FormGroup ที่มี validators
  - firstName, lastName, username: required
  - password: required + minLength(8)

Methods
- onSubmit()
  - ถ้า form valid
    - log ค่า form
    - alert สำเร็จ
  - ถ้าไม่ valid
    - markAllAsTouched() เพื่อบังคับแสดง validation error

## 11) Feature: API GET

### File: src/app/api-get/api-get.ts

Class: ApiGetComponent

Properties
- apiService
  - inject(ProductService)
- products
  - signal<Product[]>
- loading
  - signal<boolean>
- error
  - signal<string | null>

Methods
- loadProducts(): void
  - set loading = true และ clear error
  - เรียก apiService.getProducts()
  - ใช้ finalize เพื่อ set loading = false ไม่ว่าผลสำเร็จหรือล้มเหลว
  - next: ใส่ข้อมูลลง products
  - error: ใส่ข้อความลง error และ log รายละเอียด

## 12) Feature: API POST

### File: src/app/api-post/api-post.ts

Class: ApiPostComponent

Properties
- apiService
  - inject(ProductService)
- product
  - model สำหรับส่งข้อมูล
- response
  - signal<Product | null> เก็บผลลัพธ์ที่ API ตอบกลับ
- error
  - signal<string | null> เก็บข้อความผิดพลาด

Methods
- onSubmit(form: NgForm): void
  - ถ้า form.valid
    - clear error
    - เรียก apiService.addProduct(product)
    - next: set response
    - error: set error และ log
  - ถ้าไม่ valid
    - console.warn แจ้งว่าไม่ส่งข้อมูล

## 13) Environment และ Compatibility

### File: src/environments/environment.ts
- production: true
- apiBaseUrl: https://dummyjson.com

### File: src/environments/environment.development.ts
- production: false
- apiBaseUrl: https://dummyjson.com

### File: src/app/services/product.ts
- re-export ProductService และ Product type จาก core/data-access
- ใช้รักษา compatibility กับ import path เดิม

## 14) Unit Tests (Method-level ของ test code)

โครงสร้าง test ส่วนใหญ่เป็น pattern เดียวกัน
- beforeEach(async () => ...)
  - สร้าง TestingModule
  - compileComponents
  - createComponent
- it('should create', ...)
  - ตรวจว่า component/service ถูกสร้างได้

ไฟล์ทดสอบที่มีรายละเอียดเพิ่ม

### File: src/app/app.spec.ts
- beforeEach(...)
  - ลงทะเบียน provideRouter([]) เพื่อรองรับ router-outlet ใน shell
- it should create the app
  - ตรวจว่า App instance มีจริง
- it should render app shell
  - ตรวจว่ามี app-header และ router-outlet ใน DOM

### File: src/app/services/product.spec.ts
- beforeEach(...)
  - ลงทะเบียน provideHttpClient และ provideHttpClientTesting
  - inject ProductService
- it should be created
  - ตรวจว่า service ถูกสร้างได้

ไฟล์ spec อื่นที่ใช้ pattern สร้างคอมโพเนนต์พื้นฐาน
- src/app/about/about.spec.ts
- src/app/api-get/api-get.spec.ts
- src/app/api-post/api-post.spec.ts
- src/app/form-reactive/form-reactive.spec.ts
- src/app/form-template/form-template.spec.ts
- src/app/header/header.spec.ts
- src/app/home/home.spec.ts
- src/app/progress-bar/progress-bar.spec.ts
- src/app/shape/shape.spec.ts
- src/app/student/student.spec.ts

## 15) Data Flow เชิงเทคนิค

กรณี API GET/POST

1. Component เรียก method ใน ProductService
2. HttpClient ส่ง request ออก
3. Request วิ่งผ่าน httpErrorInterceptor
4. ถ้าเกิด error
   - interceptor map ข้อความ
   - เก็บข้อความที่ ErrorNotificationService.message
5. GlobalAlert อ่าน message แบบ reactive และแสดงที่หน้า shell
6. ผู้ใช้กดปิด GlobalAlert -> เรียก clear()

## 16) แนวทางขยายระบบ (สำหรับนักพัฒนา)

- ถ้าเพิ่มหน้าใหม่
  - สร้าง standalone component
  - เพิ่ม route ใน src/app/features/feature.routes.ts
- ถ้าเพิ่ม API ใหม่
  - เพิ่ม method ใน service ชั้น core/data-access
  - ให้ component เรียกผ่าน service เท่านั้น
- ถ้าต้องการมาตรฐาน error แบบเดียวกัน
  - ให้ request ผ่าน HttpClient ที่อยู่ใต้ interceptor เดิม
- ถ้าต้องการแจ้งเตือนระดับระบบ
  - ใช้ ErrorNotificationService.show(message)

---

หากต้องการต่อยอดเอกสารนี้ให้ละเอียดขึ้นอีกขั้น แนะนำเพิ่มหัวข้อ sequence diagram และ state transition ของแต่ละหน้า (โดยเฉพาะหน้าที่ใช้ signals และ forms)
