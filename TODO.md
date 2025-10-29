# Settings Implementation TODO

## Backend Changes Required

### 1. User Entity Updates
- Add new columns to `User` entity in `backend/src/modules/users/user.entity.ts`:
  - `avatar?: string` - For profile picture URL/path
  - `twoFactorEnabled: boolean` - Default: false
  - `sessionTimeout: number` - Default: 30 (minutes)
  - `loginNotifications: boolean` - Default: true
  - `recoveryEmail?: string` - For account recovery
  - `recoveryPhone?: string` - For account recovery

### 2. User DTO Updates
- Update `backend/src/modules/users/dto/update-user.dto.ts` to include:
  - Profile update fields: `fullName`, `avatar`
  - Security settings: `twoFactorEnabled`, `sessionTimeout`, `loginNotifications`, `recoveryEmail`, `recoveryPhone`

### 3. User Controller Updates
- Add new endpoints in `backend/src/modules/users/user.controller.ts`:
  - `PUT /users/profile` - Update profile (fullName, avatar)
  - `PUT /users/security` - Update security settings (password, 2FA, session timeout, notifications)
  - `POST /users/change-password` - Change password with current password verification

### 4. User Service Updates
- Update `backend/src/modules/users/user.service.ts`:
  - Add methods for profile updates
  - Add methods for security settings updates
  - Add password change logic with current password verification
  - Add avatar upload handling (if storing locally)

### 5. Database Migration
- Create migration file for new User entity columns
- Run migration to update database schema

## Frontend Changes Required

### 1. Settings Service
- Create `otp-saas-frontend/src/modules/Settings/SettingsService.ts`:
  - `updateProfile(data: { fullName: string; avatar?: File })`
  - `updateSecurity(data: SecuritySettings)`
  - `changePassword(data: { currentPassword: string; newPassword: string })`

### 2. Settings Models/Types
- Create `otp-saas-frontend/src/modules/Settings/settings.types.ts`:
  - `UserProfile` interface
  - `SecuritySettings` interface
  - `UpdateProfileRequest` interface
  - `UpdateSecurityRequest` interface
  - `ChangePasswordRequest` interface

### 3. Profile Settings Updates
- Update `otp-saas-frontend/src/modules/Settings/ProfileSettings.tsx`:
  - Replace mock API calls with real API calls using SettingsService
  - Implement proper avatar upload handling
  - Add loading states and error handling

### 4. Security Settings Updates
- Update `otp-saas-frontend/src/modules/Settings/SecuritySettings.tsx`:
  - Replace mock API calls with real API calls using SettingsService
  - Implement password change functionality
  - Add 2FA setup (if implementing)
  - Add session management

### 5. Auth Context Updates
- Update `otp-saas-frontend/src/context/AuthContext.tsx`:
  - Add methods to update user profile in context
  - Handle session timeout settings
  - Handle login notifications

## Implementation Order

1. Backend: Update User entity and create migration
2. Backend: Update DTOs and service methods
3. Backend: Add new controller endpoints
4. Frontend: Create SettingsService and types
5. Frontend: Update ProfileSettings component
6. Frontend: Update SecuritySettings component
7. Frontend: Update AuthContext for profile updates
8. Test all functionality end-to-end

## Notes

- Avatar upload: Decide between storing in database (base64) or file system/cloud storage
- Password security: Ensure proper hashing and validation
- 2FA: Consider implementing with authenticator apps or SMS
- Session timeout: Implement on frontend with automatic logout
- Recovery options: Email and phone for account recovery
- Notifications: Email notifications for login attempts
