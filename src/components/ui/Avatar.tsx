import { cn, getInitials } from '../../utils';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeStyles = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
};

const colorClasses = [
  'bg-primary-500',
  'bg-accent-500',
  'bg-success-500',
  'bg-warning-500',
  'bg-error-500',
];

function getColorFromName(name: string): string {
  const index = name.charCodeAt(0) % colorClasses.length;
  return colorClasses[index];
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  return (
    <div
      className={cn(
        'relative rounded-full flex items-center justify-center font-medium text-white overflow-hidden',
        sizeStyles[size],
        !src && bgColor,
        className
      )}
      role="img"
      aria-label={name}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

interface AvatarGroupProps {
  avatars: { name: string; src?: string }[];
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarGroup({ avatars, max = 4, size = 'sm', className }: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          name={avatar.name}
          src={avatar.src}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-medium text-secondary-600 bg-secondary-200',
            'ring-2 ring-white',
            sizeStyles[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
