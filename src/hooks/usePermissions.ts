
import { useAuth } from '@/components/auth/AuthProvider';

export interface Permissions {
  // Gallery permissions
  canManageGallery: boolean;
  canEditGalleryPhotos: boolean;
  canDeleteGalleryPhotos: boolean;
  
  // Events permissions
  canViewEvents: boolean;
  canCreateEvents: boolean;
  canEditEvents: boolean;
  canDeleteEvents: boolean;
  canSendNotifications: boolean;
  
  // User management permissions
  canViewUsers: boolean;
  canEditUserRoles: boolean;
  
  // Admin features permissions
  canManageTempleInfo: boolean;
  canManageSchedule: boolean;
  canManageFestivals: boolean;
  canManageHero: boolean;
  canManagePopups: boolean;
  
  // System permissions
  canAccessAdminPanel: boolean;
}

export const usePermissions = (): Permissions => {
  const { profile, isAdmin } = useAuth();
  const role = profile?.role;

  if (isAdmin) {
    // Admins have full permissions
    return {
      canManageGallery: true,
      canEditGalleryPhotos: true,
      canDeleteGalleryPhotos: true,
      canViewEvents: true,
      canCreateEvents: true,
      canEditEvents: true,
      canDeleteEvents: true,
      canSendNotifications: true,
      canViewUsers: true,
      canEditUserRoles: true,
      canManageTempleInfo: true,
      canManageSchedule: true,
      canManageFestivals: true,
      canManageHero: true,
      canManagePopups: true,
      canAccessAdminPanel: true,
    };
  }

  if (role === 'moderator') {
    // Moderators have limited permissions
    return {
      canManageGallery: true,
      canEditGalleryPhotos: true,
      canDeleteGalleryPhotos: true,
      canViewEvents: true,
      canCreateEvents: true,
      canEditEvents: true,
      canDeleteEvents: false, // Cannot delete events
      canSendNotifications: false, // Cannot send notifications
      canViewUsers: true,
      canEditUserRoles: false, // Cannot change user roles
      canManageTempleInfo: false,
      canManageSchedule: false,
      canManageFestivals: true,
      canManageHero: false,
      canManagePopups: true,
      canAccessAdminPanel: true,
    };
  }

  // Regular users have no admin permissions
  return {
    canManageGallery: false,
    canEditGalleryPhotos: false,
    canDeleteGalleryPhotos: false,
    canViewEvents: false,
    canCreateEvents: false,
    canEditEvents: false,
    canDeleteEvents: false,
    canSendNotifications: false,
    canViewUsers: false,
    canEditUserRoles: false,
    canManageTempleInfo: false,
    canManageSchedule: false,
    canManageFestivals: false,
    canManageHero: false,
    canManagePopups: false,
    canAccessAdminPanel: false,
  };
};
