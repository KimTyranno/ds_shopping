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

    const strengthLevels = [
      { label: '약함', color: 'text-red-600', barColor: 'bg-red-500' },
      {
        label: '보통',
        color: 'text-yellow-600',
        barColor: 'bg-yellow-500',
      },
      { label: '강함', color: 'text-blue-600', barColor: 'bg-blue-500' },
      {
        label: '매우 강함',
        color: 'text-green-600',
        barColor: 'bg-green-500',
      },
    ]

    const index = Math.min(strength, 4) - 1
    const level = strengthLevels[Math.max(index, 0)]

    return {
      strength,
      checks,
      ...level,
    }
  }

  const passwordStrength = getPasswordStrength(password)

  const checksList = [
    { key: 'length', label: '8자 이상' },
    { key: 'uppercase', label: '대문자 포함' },
    { key: 'number', label: '숫자 포함' },
    { key: 'special', label: '특수문자 포함' },
  ]

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
          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.barColor}`}
          style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}></div>
      </div>
      <div className="text-xs text-muted-foreground space-y-1">
        {checksList.map(({ key, label }) => (
          <div
            key={key}
            className={
              passwordStrength.checks[
                key as keyof typeof passwordStrength.checks
              ]
                ? 'text-green-600'
                : ''
            }>
            ✓ {label}{' '}
            {passwordStrength.checks[
              key as keyof typeof passwordStrength.checks
            ]
              ? '✓'
              : '✗'}
          </div>
        ))}
      </div>
    </div>
  )
}
