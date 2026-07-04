/* eslint-disable @typescript-eslint/no-explicit-any */
// src/routes/routeTree.gen.ts
import { Route as rootRouteImport } from './__root'
import { Route as AuthenticatedRouteRouteImport } from './_authenticated/route'
import { Route as AuthenticatedIndexRouteImport } from './_authenticated/index'
import { Route as authSignInRouteImport } from './(auth)/sign-in'
import { Route as authForgotPasswordRouteImport } from './(auth)/forgot-password'
import { Route as authSetPasswordRouteImport } from './(auth)/set-password'
import { Route as authResetPasswordRouteImport } from './(auth)/reset-password'
import { Route as AuthenticatedRolesIndexRouteImport } from './_authenticated/roles/index'
import { Route as AuthenticatedDepartmentsIndexRouteImport } from './_authenticated/departments/index'
import { Route as AuthenticatedStaffsIndexRouteImport } from './_authenticated/staffs/index'
import { Route as AuthenticatedStaffCreateIndexRouteImport } from './_authenticated/staffs/create'
import { Route as AuthenticatedStaffDetailsIndexRouteImport } from './_authenticated/staffs/details'
import { Route as AuthenticatedPatientCardsIndexRouteImport } from './_authenticated/patient-cards/index'
import { Route as AuthenticatedPatientCardCreateIndexRouteImport } from './_authenticated/patient-cards/create'
import { Route as AuthenticatedPatientCardDetailsIndexRouteImport } from './_authenticated/patient-cards/details/$patientCardId/index'
import { Route as AuthenticatedPatientCardDetailsPatientIndexRouteImport } from './_authenticated/patient-cards/details/$patientCardId/patient/$patientId'


const AuthenticatedRouteRoute = AuthenticatedRouteRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthenticatedIndexRoute = AuthenticatedIndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const authSignInRoute = authSignInRouteImport.update({
  id: '/(auth)/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRouteImport,
} as any)
const authForgotPasswordRoute = authForgotPasswordRouteImport.update({
  id: '/(auth)/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => rootRouteImport,
} as any)
const authSetPasswordRoute = authSetPasswordRouteImport.update({
  id: '/(auth)/set-password',
  path: '/set-password',
  getParentRoute: () => rootRouteImport,
} as any)
const authResetPasswordRoute = authResetPasswordRouteImport.update({
  id: '/(auth)/reset-password',
  path: '/reset-password',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthenticatedRolesIndexRoute = AuthenticatedRolesIndexRouteImport.update({
  id: '/roles/',
  path: '/roles/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedDepartmentsIndexRoute = AuthenticatedDepartmentsIndexRouteImport.update({
  id: '/departments/',
  path: '/departments/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedStaffsIndexRoute = AuthenticatedStaffsIndexRouteImport.update({
  id: '/staffs/',
  path: '/staffs/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedStaffCreateIndexRoute = AuthenticatedStaffCreateIndexRouteImport.update({
  id: '/staffs/create/',
  path: '/staffs/create/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedStaffDetailsIndexRoute = AuthenticatedStaffDetailsIndexRouteImport.update({
  id: '/staffs/details/$id',
  path: '/staffs/details/$id',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedPatientCardsIndexRoute = AuthenticatedPatientCardsIndexRouteImport.update({
  id: '/patient-cards/',
  path: '/patient-cards/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedPatientCardCreateIndexRoute = AuthenticatedPatientCardCreateIndexRouteImport.update({
  id: '/patient-cards/create',
  path: '/patient-cards/create',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedPatientCardDetailsIndexRoute = AuthenticatedPatientCardDetailsIndexRouteImport.update({
  id: '/patient-cards/details/$patientCardId',
  path: '/patient-cards/details/$patientCardId',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedPatientCardDetailsPatientIndexRoute = AuthenticatedPatientCardDetailsPatientIndexRouteImport.update({
  id: '/patient-cards/details/$patientCardId/patient/$patientId',
  path: '/patient-cards/details/$patientCardId/patient/$patientId',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)

export interface FileRoutesByFullPath {
  '/_authenticated': typeof AuthenticatedRouteRouteWithChildren
  '/': typeof AuthenticatedIndexRoute
  '/sign-in': typeof authSignInRoute
  '/forgot-password': typeof authForgotPasswordRoute
  '/set-password': typeof authSetPasswordRoute
  '/reset-password': typeof authResetPasswordRoute
  '/roles': typeof AuthenticatedRolesIndexRoute
  '/departments': typeof AuthenticatedDepartmentsIndexRoute
  '/staffs': typeof AuthenticatedStaffsIndexRoute
  '/staffs/create': typeof AuthenticatedStaffCreateIndexRoute
  '/staffs/details/$id': typeof AuthenticatedStaffDetailsIndexRoute
  '/patient-cards': typeof AuthenticatedPatientCardsIndexRoute
  '/patient-cards/create': typeof AuthenticatedPatientCardCreateIndexRoute
  '/patient-cards/details/$patientCardId': typeof AuthenticatedPatientCardDetailsIndexRoute
  '/patient-cards/details/$patientCardId/patient/$patientId': typeof AuthenticatedPatientCardDetailsPatientIndexRoute
}

export interface FileRoutesByTo {
  '/_authenticated': typeof AuthenticatedRouteRouteWithChildren
  '/': typeof AuthenticatedIndexRoute
  '/sign-in': typeof authSignInRoute
  '/forgot-password': typeof authForgotPasswordRoute
  '/set-password': typeof authSetPasswordRoute
  '/reset-password': typeof authResetPasswordRoute
  '/roles': typeof AuthenticatedRolesIndexRoute
  '/departments': typeof AuthenticatedDepartmentsIndexRoute
  '/staffs': typeof AuthenticatedStaffsIndexRoute
  '/staffs/create': typeof AuthenticatedStaffCreateIndexRoute
  '/staffs/details/$id': typeof AuthenticatedStaffDetailsIndexRoute
  '/patient-cards': typeof AuthenticatedPatientCardsIndexRoute
  '/patient-cards/create': typeof AuthenticatedPatientCardCreateIndexRoute
  '/patient-cards/details/$patientCardId': typeof AuthenticatedPatientCardDetailsIndexRoute
  '/patient-cards/details/$patientCardId/patient/$patientId': typeof AuthenticatedPatientCardDetailsPatientIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/_authenticated': typeof AuthenticatedRouteRouteWithChildren
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/(auth)/sign-in': typeof authSignInRoute
  '/(auth)/forgot-password': typeof authForgotPasswordRoute
  '/(auth)/set-password': typeof authSetPasswordRoute
  '/(auth)/reset-password': typeof authResetPasswordRoute
  '/_authenticated/roles/': typeof AuthenticatedRolesIndexRoute
  '/_authenticated/departments/': typeof AuthenticatedDepartmentsIndexRoute
  '/_authenticated/staffs/': typeof AuthenticatedStaffsIndexRoute
  '/_authenticated/staffs/create': typeof AuthenticatedStaffCreateIndexRoute
  '/_authenticated/staffs/details/$id': typeof AuthenticatedStaffDetailsIndexRoute
  '/_authenticated/patient-cards/': typeof AuthenticatedPatientCardsIndexRoute
  '/_authenticated/patient-cards/create': typeof AuthenticatedPatientCardCreateIndexRoute
  '/_authenticated/patient-cards/details/$patientCardId': typeof AuthenticatedPatientCardDetailsIndexRoute
  '/_authenticated/patient-cards/details/$patientCardId/patient/$patientId': typeof AuthenticatedPatientCardDetailsPatientIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/sign-in'
    | '/forgot-password'
    | '/set-password'
    | '/reset-password'
    | '/'
    | '/roles'
    | '/departments'
    | '/staffs'
    | '/staffs/create'
    | '/staffs/details/$id'
    | '/patient-cards'
    | '/patient-cards/create'
    | '/patient-cards/details/$patientCardId'
    | '/patient-cards/details/$patientCardId/patient/$patientId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/sign-in'
    | '/forgot-password'
    | '/set-password'
    | '/reset-password'
    | '/'
    | '/roles'
    | '/departments'
    | '/staffs'
    | '/staffs/create'
    | '/staffs/details/$id'
    | '/patient-cards'
    | '/patient-cards/create'
    | '/patient-cards/details/$patientCardId'
    | '/patient-cards/details/$patientCardId/patient/$patientId'
  id:
    | '__root__'
    | '/_authenticated'
    | '/(auth)/sign-in'
    | '/(auth)/forgot-password'
    | '/(auth)/set-password'
    | '/(auth)/reset-password'
    | '/_authenticated/roles/'
    | '/_authenticated/departments/'
    | '/_authenticated/staffs/'
    | '/_authenticated/staffs/create'
    | '/_authenticated/staffs/details/$id'
    | '/_authenticated/patient-cards/'
    | '/_authenticated/patient-cards/create'
    | '/_authenticated/patient-cards/details/$patientCardId'
    | '/_authenticated/patient-cards/details/$patientCardId/patient/$patientId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRouteRoute: typeof AuthenticatedRouteRouteWithChildren
  authSignInRoute: typeof authSignInRoute
  authForgotPasswordRoute: typeof authForgotPasswordRoute
  authSetPasswordRoute: typeof authSetPasswordRoute
  authResetPasswordRoute: typeof authResetPasswordRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/(auth)/sign-in': {
      id: '/(auth)/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof authSignInRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/(auth)/forgot-password': {
      id: '/(auth)/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof authForgotPasswordRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/(auth)/set-password': {
      id: '/(auth)/set-password'
      path: '/set-password'
      fullPath: '/set-password'
      preLoaderRoute: typeof authSetPasswordRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/(auth)/reset-password': {
      id: '/(auth)/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof authResetPasswordRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authenticated/roles/': {
      id: '/_authenticated/roles/'
      path: '/roles'
      fullPath: '/roles'
      preLoaderRoute: typeof AuthenticatedRolesIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/departments/': {
      id: '/_authenticated/departments/'
      path: '/departments'
      fullPath: '/departments'
      preLoaderRoute: typeof AuthenticatedDepartmentsIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/staffs/': {
      id: '/_authenticated/staffs/'
      path: '/staffs'
      fullPath: '/staffs'
      preLoaderRoute: typeof AuthenticatedStaffsIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/staffs/create': {
      id: '/_authenticated/staffs/create'
      path: '/staffs/create'
      fullPath: '/staffs/create'
      preLoaderRoute: typeof AuthenticatedStaffCreateIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/staffs/details/$id': {
      id: '/_authenticated/staffs/details/$id'
      path: '/staffs/details/$id'
      fullPath: '/staffs/details/$id'
      preLoaderRoute: typeof AuthenticatedStaffDetailsIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/patient-cards/': {
      id: '/_authenticated/patient-cards/'
      path: '/patient-cards'
      fullPath: '/patient-cards'
      preLoaderRoute: typeof AuthenticatedPatientCardsIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/patient-cards/create': {
      id: '/_authenticated/patient-cards/create'
      path: '/patient-cards/create'
      fullPath: '/patient-cards/create'
      preLoaderRoute: typeof AuthenticatedPatientCardCreateIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/patient-cards/details/$patientCardId': {
      id: '/_authenticated/patient-cards/details/$patientCardId'
      path: '/patient-cards/details/$patientCardId'
      fullPath: '/patient-cards/details/$patientCardId'
      preLoaderRoute: typeof AuthenticatedPatientCardDetailsIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/patient-cards/details/$patientCardId/patient/$patientId': {
      id: '/_authenticated/patient-cards/details/$patientCardId/patient/$patientId'
      path: '/patient-cards/details/$patientCardId/patient/$patientId'
      fullPath: '/patient-cards/details/$patientCardId/patient/$patientId'
      preLoaderRoute: typeof AuthenticatedPatientCardDetailsPatientIndexRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
  }
}

interface AuthenticatedRouteRouteChildren {
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedRolesIndexRoute: typeof AuthenticatedRolesIndexRoute
  AuthenticatedDepartmentsIndexRoute: typeof AuthenticatedDepartmentsIndexRoute
  AuthenticatedStaffsIndexRoute: typeof AuthenticatedStaffsIndexRoute
  AuthenticatedStaffCreateIndexRoute: typeof AuthenticatedStaffCreateIndexRoute
  AuthenticatedStaffDetailsIndexRoute: typeof AuthenticatedStaffDetailsIndexRoute
  AuthenticatedPatientCardsIndexRoute: typeof AuthenticatedPatientCardsIndexRoute
  AuthenticatedPatientCardCreateIndexRoute: typeof AuthenticatedPatientCardCreateIndexRoute
  AuthenticatedPatientCardDetailsIndexRoute: typeof AuthenticatedPatientCardDetailsIndexRoute
  AuthenticatedPatientCardDetailsPatientIndexRoute: typeof AuthenticatedPatientCardDetailsPatientIndexRoute
}

const AuthenticatedRouteRouteChildren: AuthenticatedRouteRouteChildren = {
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedRolesIndexRoute: AuthenticatedRolesIndexRoute,
  AuthenticatedDepartmentsIndexRoute: AuthenticatedDepartmentsIndexRoute,
  AuthenticatedStaffsIndexRoute: AuthenticatedStaffsIndexRoute,
  AuthenticatedStaffCreateIndexRoute: AuthenticatedStaffCreateIndexRoute,
  AuthenticatedStaffDetailsIndexRoute: AuthenticatedStaffDetailsIndexRoute,
  AuthenticatedPatientCardsIndexRoute: AuthenticatedPatientCardsIndexRoute,
  AuthenticatedPatientCardCreateIndexRoute: AuthenticatedPatientCardCreateIndexRoute,
  AuthenticatedPatientCardDetailsIndexRoute: AuthenticatedPatientCardDetailsIndexRoute,
  AuthenticatedPatientCardDetailsPatientIndexRoute: AuthenticatedPatientCardDetailsPatientIndexRoute,
}

const AuthenticatedRouteRouteWithChildren =
  AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  authSignInRoute: authSignInRoute,
  authForgotPasswordRoute: authForgotPasswordRoute,
  authSetPasswordRoute: authSetPasswordRoute,
  authResetPasswordRoute: authResetPasswordRoute,
}

export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()


