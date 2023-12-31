const MessageLang =  {
    deleteSuccess: "삭제되었습니다.",
    titleDelete: "확인",
    messageDelete: "삭제하시겠습니까?",
    verify: "확인",
    confirm: "저장하시겠습니까?",
    confirmLogout: "로그아웃 하시겠습니까?",
    delete: "삭제하시겠습니까?",
    // Request message
    errorRequestServer: "서버 오류가 발생했습니다.",
    success: "저장되었습니다.",
    sameRequired: "비밀번호는 동일해야 합니다.",
    // Required message
    required: "입력하세요.",
    requiredSelect: "선택하세요.",
    requiredNumber: "숫자를 입력하세요.",
    requiredSpace: "올바른 형식으로 입력하세요.",
    requiredEmailSpace: "올바른 이메일 형식이 아닙니다.",
    emailRequired: "이메일을 입력하세요.",
    emailInvalid: "올바른 이메일 형식이 아닙니다.",
    urlRequired: "올바른 URL 형식이 아닙니다.",

    passwordRequired: "비밀번호를 입력하세요.",
    passwordInvalid: "비밀번호는 8자 이상 16자 이하의 영문, 숫자, 특수문자를 혼합하여 입력하세요.",
    passwordConfirmRequired: "비밀번호 확인을 입력하세요.",
    passwordConfirmCompare: "비밀번호가 일치하지 않습니다.",
    currentPasswordRequired: "현재 비밀번호를 입력하세요.",
    newPasswordRequired: "새 비밀번호를 입력하세요.",
    newPasswordCompareOld: "새 비밀번호는 현재 비밀번호와 동일할 수 없습니다.",
    newPasswordConfirmRequired: "새 비밀번호 확인을 입력하세요.",
    newPasswordConfirmCompare: "새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.",

    characterExceeded: "입력 가능한 글자 수를 초과하였습니다.",
    characterRequired: "영문, 숫자, 특수문자를 입력하세요.",
    maxLength5000: "5000자 이내로 입력하세요.",
    maxLength1000: "1000자 이내로 입력하세요.",
    maxLength100: "100자 이내로 입력하세요.",
    maxLength10: "10자 이내로 입력하세요.",
    matchDate: "날짜가 중복되었습니다.",
    matchTime: "시간대가 중복되었습니다.",
    errorStartTime: "종료 시간 이전을 선택하세요.",
    errorEndTime: "시작 시간 이후를 선택하세요.",
    phoneNumberRequired: "올바른 전화번호 형식이 아닙니다.",
    passwordNotMatch: "비밀번호 확인이 일치하지 않습니다.",
    categoryDuplicate: "카테고리가 중복되었습니다.",

    validateStartNumber: "종료 값은 시작 값 이상으로 설정하세요.",
    validateEndNumber: "종료 값은 시작 값 이상으로 설정하세요.",
    passwordsMustMatch: "확인 비밀번호가 일치하지 않습니다",

    idLength: 'ID는 최소 4자 이상이어야 합니다',
    idRequired: 'ID가 필요합니다',
    passwordPattern: '비밀번호는 문자, 숫자 및 특수 문자만 포함해야 합니다: !@#$%^&*',
    passwordUppercase: '비밀번호에는 대문자가 하나 이상 포함되어야 합니다',
    passwordLowercase: '비밀번호에는 소문자가 하나 이상 포함되어야 합니다',
    passwordNumber: '비밀번호에는 숫자가 하나 이상 포함되어야 합니다',
    passwordSpecialChar: '비밀번호에는 다음 특수 문자 중 하나 이상 포함되어야 합니다: !@#$%^&*',
    spacevalidate: "값에는 공백이 포함될 수 없습니다.",
    passwordConsecutive: '비밀번호는 연속으로 3자 이상 포함될 수 없습니다',
    passwordLengthMin: '비밀번호는 최소 10자 이상이어야 합니다',
    passwordLengthMax: '비밀번호는 최대 20자를 초과할 수 없습니다',
    
    passwordMatch: '비밀번호가 일치하지 않습니다',
    namePattern: '이름은 문자와 공백만 포함해야 합니다',
    nameRequired: '이름이 필요합니다',
    phonePattern: '전화번호는 숫자만 포함해야 합니다',
    phoneRequired: '전화번호가 필요합니다',
    emailFormat: '유효하지 않은 이메일 형식입니다',
    emailDomain: '유효하지 않은 이메일 도메인입니다'
}
export default MessageLang;
