
## Análise da estrutura atual

**Rotas existentes** em `src/routes/`:
- `index.tsx` — home com captura de região + CTA "Iniciar Identificação"
- `capturar.tsx` — captura de foto
- `analisando.tsx` — loading da análise
- `resultado.tsx` — peça identificada (SB-20B)
- `compatibilidade.tsx` — peças relacionadas
- `distribuidores.tsx` — distribuidores
- `finalizado.tsx` — confirmação final
- `insights.tsx` — dashboard global (heatmap mundial)

**Componentes-chave**:
- `src/components/jacto/Shell.tsx` — layout/header com botão de Insights
- `src/lib/region.ts` — estado de região via `localStorage` (`useRegion`)
- `src/styles.css` — design tokens (laranja já é a `--primary`)
- shadcn/ui completo disponível

**Observações**:
- Não há autenticação nem separação por role hoje
- Insights é tela de gestor de fato, mas acessível a todos
- Strings hardcoded em português em todas as rotas
- Cor primária já é laranja (oklch 0.66 0.196 38) — manter

---

## O que será criado/modificado

### Novos arquivos

1. **i18n leve e escalável** (sem dependências extras)
   - `src/i18n/types.ts` — tipos de chaves
   - `src/i18n/locales/pt.ts`, `en.ts`, `es.ts` — dicionários
   - `src/i18n/index.ts` — `useT()`, `useLocale()`, `LocaleProvider`, persistência em `localStorage`
   - `src/components/jacto/LanguageSwitcher.tsx` — seletor PT/EN/ES no header

2. **Auth e roles (mock, sem backend)**
   - `src/lib/auth.ts` — `useAuth()`, `login()`, `logout()`, persiste `{ name, role: "gestor" | "usuario" }` em `localStorage`. Mock: senha qualquer; e-mails com `gestor` viram role gestor, demais viram usuario (ou seletor explícito no form).
   - `src/routes/login.tsx` — formulário de login (após região)
   - `src/routes/_authenticated.tsx` — layout pathless que protege rotas filhas via `beforeLoad` + redirect para `/login`

3. **Separação por role**
   - `src/routes/_authenticated/_gestor.tsx` — guard que exige `role === "gestor"` (redireciona usuários para `/identificar`)
   - Adicionar `src/lib/auth` ao router context em `__root.tsx` e `router.tsx`

### Rotas movidas (mantendo todo o conteúdo atual, só reorganizando)

- `index.tsx` → continua sendo a **seleção de região** (passo 1, público)
- `login.tsx` → **novo**, passo 2
- `capturar.tsx` → `_authenticated/identificar.tsx` (passo 3, ambos roles)
- `analisando.tsx`, `resultado.tsx`, `compatibilidade.tsx`, `distribuidores.tsx`, `finalizado.tsx` → movidas para `_authenticated/` (passo 4, ambos roles)
- `insights.tsx` → `_authenticated/_gestor/insights.tsx` (somente gestor)

> Conteúdo das telas **não muda** — só o caminho do arquivo e os imports de navegação são ajustados.

### Modificações pontuais

- `src/routes/__root.tsx` — `LocaleProvider`, contexto de auth no router
- `src/router.tsx` — context com `auth` e `queryClient`
- `src/components/jacto/Shell.tsx` — adicionar `LanguageSwitcher`, botão de logout quando autenticado, esconder botão Insights para `role === "usuario"`, espaçamento mais corporativo (header padding maior, separator sutil)
- `src/routes/index.tsx` — após escolher região, CTA agora navega para `/login` (não mais `/capturar`); textos via `useT()`
- Todas as rotas migradas — substituir strings hardcoded por `t("chave")` (apenas labels visíveis; dados de catálogo SB-20B permanecem literais)
- `src/styles.css` — refinos de espaçamento/hierarquia (sem mudar paleta laranja)

### Padronização visual corporativa

- Manter laranja como `--primary` (já está)
- Aumentar `--radius` base mais sutil em superfícies grandes, tipografia com tracking levemente reduzido em títulos
- Cards com borda mais discreta, sombras mais leves, hierarquia de títulos mais clara (h1/h2/h3 com escalas consistentes)
- Sem mudanças disruptivas — refino, não rebrand

---

## Novo fluxo

```text
/  (Região, público)
   ↓ seleciona região
/login  (público; lê região do localStorage)
   ↓ autentica → salva role
/identificar  (_authenticated, ambos)
   ↓
/analisando → /resultado → /compatibilidade → /distribuidores → /finalizado
   ↓
/insights  (_authenticated/_gestor, só gestor)
```

Usuário comum: vê apenas o fluxo de identificação. Gestor: vê tudo + Insights no menu.

---

## Implementação incremental (ordem)

1. **i18n + LocaleProvider + LanguageSwitcher** (não-disruptivo, dicionários começam com chaves usadas)
2. **Auth mock + router context + `_authenticated` layout + `/login`**
3. **Mover rotas existentes para `_authenticated/`** e atualizar links (`Link to="..."`)
4. **Guard de gestor** em `_authenticated/_gestor/` e mover `insights`
5. **Shell**: language switcher, logout, esconder insights para usuário
6. **Refino visual corporativo** em tokens/Shell
7. **Tradução das strings visíveis** nas rotas migradas

Cada passo deixa o app funcional — sem big-bang.

---

## Riscos e mitigações

- **`routeTree.gen.ts` é auto-gerado** — só crio/movo arquivos em `src/routes/`, deixo o plugin regenerar
- **Links quebrados após mover rotas** — varro `Link to=` e `navigate({ to:` em uma passada após cada movimentação
- **SSR + localStorage** — `useAuth`/`useRegion`/`useLocale` já fazem guard `typeof window`; `beforeLoad` do `_authenticated` lê de `context.auth` (hidratado no client)
- **Sem regressão de catálogo SB-20B** — dados de peças permanecem como estão, só labels de UI são traduzidos

---

## Confirmação antes de começar

Confirma 3 pontos para eu seguir sem retrabalho:

1. **Auth mock é suficiente** nesta fase (sem Lovable Cloud / backend real)? Login aceita qualquer credencial e role é definida por seletor no formulário.
2. **Idioma padrão** = Português, com persistência em `localStorage`?
3. **Usuário comum** realmente **não** deve acessar `/insights` (ou pode ver versão reduzida)?
