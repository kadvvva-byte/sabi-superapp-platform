const installAdminUiDomMutationGuard235B = () => {
  const marker = '__sabiAdminUiDomMutationGuard235BInstalled';

  if ((window as any)[marker]) return;
  (window as any)[marker] = true;

  const originalRemoveChild = Node.prototype.removeChild;
  const originalInsertBefore = Node.prototype.insertBefore;

  Node.prototype.removeChild = function removeChild235B<T extends Node>(child: T): T {
    try {
      if (!child) return child;

      if (child.parentNode !== this) {
        if (child.parentNode) {
          return originalRemoveChild.call(child.parentNode, child) as T;
        }

        console.warn('[Admin UI 235B] ignored stale removeChild', {
          parent: this,
          child,
        });

        return child;
      }

      return originalRemoveChild.call(this, child) as T;
    } catch (error) {
      console.warn('[Admin UI 235B] recovered removeChild crash', error);
      return child;
    }
  };

  Node.prototype.insertBefore = function insertBefore235B<T extends Node>(newNode: T, referenceNode: Node | null): T {
    try {
      if (referenceNode && referenceNode.parentNode !== this) {
        console.warn('[Admin UI 235B] recovered stale insertBefore reference', {
          parent: this,
          referenceNode,
          newNode,
        });

        return this.appendChild(newNode) as T;
      }

      return originalInsertBefore.call(this, newNode, referenceNode) as T;
    } catch (error) {
      console.warn('[Admin UI 235B] recovered insertBefore crash', error);
      return this.appendChild(newNode) as T;
    }
  };
};

try {
  installAdminUiDomMutationGuard235B();
} catch (error) {
  console.error('[Admin UI 235B] DOM mutation guard install failed', error);
}

export {};
