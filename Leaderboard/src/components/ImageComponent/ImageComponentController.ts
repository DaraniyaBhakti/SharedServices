import * as React from "react";

interface UseImageComponentProps {
  initialUri: string;
}

type UseImageComponentOutputProps = [boolean, string, () => void, () => void];
export function useImageComponent(
  input: UseImageComponentProps,
): UseImageComponentOutputProps {
  const { initialUri } = input;

  const [loading, setLoading] = React.useState<boolean>(true);

  const [imageUri, setImageUri] = React.useState<string>(initialUri);

  const handleLoadEnd = React.useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = React.useCallback(() => {
    setLoading(false);
    setImageUri(initialUri);
  }, [initialUri]);

  return [loading, imageUri, handleLoadEnd, handleError];
}
