# CodeMirror Editor Fix Implementation Plan

## Overview
This document outlines the complete plan to fix the CodeMirror editor at `src/components/chat/editor/code-mirror-editor.tsx` by removing all dependencies on the `/chat/codemirror` directory and creating a fully self-contained editor.

## Current Issues

### Dependencies to Remove
- **Line 44**: `import { getLanguage } from "../codemirror/languages"`
- **Line 417**: Usage of `getLanguage(doc.filePath)` in `setEditorDocument` function

### Problems
1. Editor depends on external codemirror directory that will be deleted
2. Missing self-contained language support system
3. No fallback handling for unsupported file types

## Implementation Strategy

### Phase 1: Create Internal Language Support System

#### 1.1 Language Extension Mapping
Create comprehensive file extension to language mapping:

```typescript
const LANGUAGE_EXTENSIONS = {
  // JavaScript & TypeScript
  javascript: ['js', 'mjs', 'cjs'],
  typescript: ['ts'],
  jsx: ['jsx'],
  tsx: ['tsx'],
  
  // Web Technologies
  html: ['html', 'htm'],
  css: ['css'],
  scss: ['scss'],
  sass: ['sass'],
  
  // Data & Markup
  json: ['json'],
  markdown: ['md', 'mdx'],
  
  // Other Languages
  python: ['py'],
  cpp: ['cpp', 'c++', 'cc', 'cxx'],
  vue: ['vue'],
  wasm: ['wat']
};
```

#### 1.2 Dynamic Language Loading Function
Implement async language loading with caching:

```typescript
async function getLanguageSupport(filePath: string) {
  const extension = filePath.split('.').pop()?.toLowerCase();
  if (!extension) return undefined;

  try {
    switch (extension) {
      case 'ts':
        return await import('@codemirror/lang-javascript').then(m => 
          m.javascript({ typescript: true })
        );
      case 'tsx':
        return await import('@codemirror/lang-javascript').then(m => 
          m.javascript({ jsx: true, typescript: true })
        );
      case 'js':
      case 'mjs':
      case 'cjs':
        return await import('@codemirror/lang-javascript').then(m => 
          m.javascript()
        );
      case 'jsx':
        return await import('@codemirror/lang-javascript').then(m => 
          m.javascript({ jsx: true })
        );
      case 'html':
      case 'htm':
        return await import('@codemirror/lang-html').then(m => m.html());
      case 'css':
        return await import('@codemirror/lang-css').then(m => m.css());
      case 'scss':
        return await import('@codemirror/lang-sass').then(m => 
          m.sass({ indented: false })
        );
      case 'sass':
        return await import('@codemirror/lang-sass').then(m => 
          m.sass({ indented: true })
        );
      case 'json':
        return await import('@codemirror/lang-json').then(m => m.json());
      case 'md':
      case 'mdx':
        return await import('@codemirror/lang-markdown').then(m => m.markdown());
      case 'py':
        return await import('@codemirror/lang-python').then(m => m.python());
      case 'cpp':
      case 'c++':
      case 'cc':
      case 'cxx':
        return await import('@codemirror/lang-cpp').then(m => m.cpp());
      case 'vue':
        return await import('@codemirror/lang-vue').then(m => m.vue());
      case 'wat':
        return await import('@codemirror/lang-wast').then(m => m.wast());
      default:
        return undefined;
    }
  } catch (error) {
    console.warn(`Failed to load language support for .${extension}:`, error);
    return undefined;
  }
}
```

### Phase 2: Enhanced Theme System

#### 2.1 Improved Theme Configuration
Enhanced VS Code-like themes with better syntax highlighting:

```typescript
function getEditorTheme(isDark: boolean): Extension {
  return EditorView.theme({
    "&": {
      fontSize: "14px",
      fontFamily: "var(--font-geist-mono), 'JetBrains Mono', 'Fira Code', monospace",
    },
    "&.cm-editor": {
      height: "100%",
      background: isDark ? "#1e1e1e" : "#ffffff",
      color: isDark ? "#d4d4d4" : "#24292e",
      border: isDark ? "1px solid #3e3e42" : "1px solid #e1e4e8",
    },
    // Enhanced styling for better UX...
  });
}
```

### Phase 3: Performance Optimizations

#### 3.1 Language Caching System
Implement caching to avoid repeated imports:

```typescript
const languageCache = new Map<string, any>();

async function getCachedLanguageSupport(filePath: string) {
  const extension = filePath.split('.').pop()?.toLowerCase();
  if (!extension) return undefined;
  
  if (languageCache.has(extension)) {
    return languageCache.get(extension);
  }
  
  const languageSupport = await getLanguageSupport(filePath);
  if (languageSupport) {
    languageCache.set(extension, languageSupport);
  }
  
  return languageSupport;
}
```

#### 3.2 Error Boundary & Fallback Handling
Graceful degradation when language loading fails:

```typescript
async function safeGetLanguageSupport(filePath: string) {
  try {
    return await getCachedLanguageSupport(filePath);
  } catch (error) {
    console.warn(`Language support failed for ${filePath}:`, error);
    return undefined; // Editor still works without syntax highlighting
  }
}
```

### Phase 4: Code Structure Improvements

#### 4.1 Better Type Definitions
```typescript
interface LanguageSupport {
  extension: Extension;
  name: string;
}

interface EditorLanguageConfig {
  extensions: string[];
  loader: () => Promise<LanguageSupport>;
}
```

#### 4.2 Memory Management
Proper cleanup on component unmount:

```typescript
useEffect(() => {
  return () => {
    // Clear language cache on unmount to prevent memory leaks
    languageCache.clear();
    viewRef.current?.destroy();
    viewRef.current = undefined;
  };
}, []);
```

## Implementation Steps

### Step 1: Remove External Dependencies
- [ ] Remove `import { getLanguage } from "../codemirror/languages"`
- [ ] Replace all `getLanguage` function calls

### Step 2: Add Internal Language Support
- [ ] Add language extension mapping
- [ ] Implement `getLanguageSupport` function
- [ ] Add caching mechanism
- [ ] Add error handling

### Step 3: Update Editor Configuration
- [ ] Update `setEditorDocument` function
- [ ] Replace `getLanguage` calls with `getLanguageSupport`
- [ ] Add fallback handling

### Step 4: Enhance Themes & Styling
- [ ] Improve dark/light theme configurations
- [ ] Add better syntax highlighting support
- [ ] Enhance editor aesthetics

### Step 5: Performance & Memory Optimizations
- [ ] Add language caching
- [ ] Implement proper cleanup
- [ ] Add error boundaries

### Step 6: Testing & Validation
- [ ] Test with various file types
- [ ] Verify no external dependencies
- [ ] Test theme switching
- [ ] Validate performance improvements

## Expected Outcomes

After implementation:

✅ **Complete Independence**: No dependencies on `/chat/codemirror` directory  
✅ **Comprehensive Language Support**: All major file types supported  
✅ **Enhanced Performance**: Caching and optimized loading  
✅ **Better Error Handling**: Graceful fallbacks  
✅ **Improved Themes**: Enhanced VS Code-like appearance  
✅ **Type Safety**: Better TypeScript integration  
✅ **Memory Efficiency**: Proper cleanup and caching  

## Files Modified

- `src/components/chat/editor/code-mirror-editor.tsx` - Main editor component

## Dependencies Used

All required CodeMirror packages are already installed:
- `@codemirror/lang-javascript` - JS/TS/JSX/TSX support
- `@codemirror/lang-html` - HTML support
- `@codemirror/lang-css` - CSS support
- `@codemirror/lang-sass` - SCSS/SASS support
- `@codemirror/lang-json` - JSON support
- `@codemirror/lang-markdown` - Markdown support
- `@codemirror/lang-python` - Python support
- `@codemirror/lang-cpp` - C++ support
- `@codemirror/lang-vue` - Vue support
- `@codemirror/lang-wast` - WebAssembly support

## Success Criteria

1. Editor works completely independently
2. All major file types have syntax highlighting
3. Theme switching works properly
4. No console errors or warnings
5. Good performance with large files
6. Graceful handling of unsupported file types