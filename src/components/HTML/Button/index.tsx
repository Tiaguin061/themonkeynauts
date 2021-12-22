import {
  Loading
} from '@/components';

import {
  Container,
} from './styles';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  text?: string;
  loading?: {
    state: boolean;
    size?: number;
  }
}

export function Button({text, loading, ...rest}: ButtonProps) {
  return (
    <Container
      {...rest}
    >
      {loading && loading.state ? (
        <Loading
          size={loading.size}
        />
      ): (
        text
      )}
    </Container>
  )
}