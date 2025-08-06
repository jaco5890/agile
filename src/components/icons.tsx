import { Colors } from '../constants';
import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';

type FeatherIconName = ComponentProps<typeof Feather>['name'];

interface IconProps {
    size?: number;
    color?: string;
    name: FeatherIconName;
}

export const FeatherIcon = ({ name, size = 14, color = Colors.default.grey}: IconProps) => (
    <Feather name={name} size={size} color={color} />
  );