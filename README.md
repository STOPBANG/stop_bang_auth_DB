# 회원 관련 DB 마이크로서비스

## 준비하기

설정 파일을 다음 경로에 추가해 주어야 합니다.

`config.json` 파일 내용은 노션에서 확인할 수 있습니다.

```
database
├── config
│   └── config.json
```

## 이해하기

이 마이크로서비스는 agent, resident, agent_list, certificate, agent_contact 테이블을 가지고 있는 DB 서버와 통신하며 데이터 CRUD를 합니다.

Spring의 JPA와 비슷한 역할을 합니다.

여기 회원 관련 DB 마이크로서비스가 구현된 사항을 적어 두겠습니다.

### UPDATE 24-04-24

1. `/db/resident/create`, `/db/agent/create`
  
    입주민, 공인중개사 회원 가입 기능

    입력된, 공인중개사 회원 정보를 저장

    **통신하는 부분**
    
    - stop_bang_main의 register의 model 부분 -> stop_bang_register로 그대로 이동하면 됩니다
  
2. `/db/resident/findById`, `/db/agent/findById`

    입주민, 공인중개사 회원 조회 기능
    
    여기서 ID는 pk가 아니라 로그인할 때 사용하는 username입니다

    **통신하는 부분**

    - stop_bang_login_logout의 login model 부분

3. `/db/resident/delete`, `/db/agent/delete`

    입주민, 공인중개사 회원 탈퇴 기능

    해당 회원 정보를 삭제

    **통신하는 부분**

    - stop_bang_main의 register의 model 부분 -> stop_bang_register로 그대로 이동하면 됩니다

4. `/db/cert/create`

    회원 가입 시 이메일 인증 코드를 생성합니다

    **통신하는 부분**

    - stop_bang_main의 register의 controller 부분 -> stop_bang_register로 그대로 이동하면 됩니다


5. `/db/cert/compare`

    회원 가입 시 이메일 인증 코드를 비교하여 일치 여부를 확인합니다

    **통신하는 부분**
    
    - stop_bang_main의 register의 controller 부분 -> stop_bang_register로 그대로 이동하면 됩니다