# Painel de uso da Babá do Pet

1. Crie um projeto grátis em supabase.com.
2. SQL Editor → New query → cole `supabase_eventos.sql` → Run.
3. Settings → API: copie **Project URL** e a chave **anon public**.
4. No `index.html`, procure `const AN_URL = '', AN_KEY = ''` e preencha com a URL e a chave **anon** (ela é pública; a tabela só aceita inserir, ninguém lê com ela).
5. Publique o app de novo no GitHub (index.html, sw.js, privacidade.html).
6. Abra `painel_admin.html` **direto do seu computador** (duplo clique). Cole a URL e a chave **service_role** (Settings → API). Essa chave NUNCA vai para o GitHub nem para o app.
7. Use "ocultar" no painel nos seus próprios aparelhos para não contarem como visitantes. A medição é sempre ligada.

O que é medido: abrir o app, telas, cadastro de pet (só a espécie), uso de agenda/vacina/peso/gasto/refeição/plano, instalação. Nada de nome do pet, fotos, valores ou datas de saúde.
