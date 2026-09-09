let supported: boolean | undefined;

/** Check before mounting Canvas: renderer startup errors can escape React boundaries. */
export function supportsWebGL2(): boolean {
  if (supported !== undefined) return supported;
  if (typeof document === 'undefined') return false;
  try {
    const context = document.createElement('canvas').getContext('webgl2');
    supported = !!context;
    context?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    supported = false;
  }
  return supported;
}
