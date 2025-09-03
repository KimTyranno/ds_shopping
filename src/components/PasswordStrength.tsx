'use client'

/** 비밀번호 강도 표시 */
export default function PasswordStrength({ password }: { password: string }) {
  // 비밀번호 강도 검사
  const getPasswordStrength = (password: string) => {
    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    strength = Object.values(checks).filter(Boolean).length

    return {
      strength,
      checks,
      label:
        strength < 2
          ? '약함'
          : strength < 4
            ? '보통'
            : strength === 4
              ? '강함'
              : '매우 강함',
      color:
        strength < 2
          ? 'text-red-600'
          : strength < 4
            ? 'text-yellow-600'
            : strength === 4
              ? 'text-blue-600'
              : 'text-green-600',
    }
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">비밀번호 강도:</span>
        <span className={`text-sm font-medium ${passwordStrength.color}`}>
          {passwordStrength.label}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            passwordStrength.strength < 2
              ? 'bg-red-500'
              : passwordStrength.strength < 4
                ? 'bg-yellow-500'
                : passwordStrength.strength === 4
                  ? 'bg-blue-500'
                  : 'bg-green-500'
          }`}
          style={{
            width: `${(passwordStrength.strength / 5) * 100}%`,
          }}></div>
      </div>
      <div className="text-xs text-muted-foreground space-y-1">
        <div className={passwordStrength.checks.length ? 'text-green-600' : ''}>
          ✓ 8자 이상 {passwordStrength.checks.length ? '✓' : '✗'}
        </div>
        <div
          className={passwordStrength.checks.uppercase ? 'text-green-600' : ''}>
          ✓ 대문자 포함 {passwordStrength.checks.uppercase ? '✓' : '✗'}
        </div>
        <div className={passwordStrength.checks.number ? 'text-green-600' : ''}>
          ✓ 숫자 포함 {passwordStrength.checks.number ? '✓' : '✗'}
        </div>
        <div
          className={passwordStrength.checks.special ? 'text-green-600' : ''}>
          ✓ 특수문자 포함 {passwordStrength.checks.special ? '✓' : '✗'}
        </div>
      </div>
    </div>
  )
}
