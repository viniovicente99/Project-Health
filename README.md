🧠 Project Health Dashboard

Sistema para monitoramento de saúde de projetos com foco em tomada de decisão rápida, baseado em indicadores visuais e atualizações em tempo real.

🔗 Live: http://project-health-frontend.s3-website.us-east-2.amazonaws.com/projects-dashboard

🎯 Problema

Em ambientes corporativos, é comum existir uma lacuna entre o status reportado e a situação real dos projetos. Isso gera:

Falta de visibilidade
Decisões reativas
Dificuldade de priorização

Este projeto foi desenvolvido para responder de forma objetiva:

"Este projeto está saudável ou caminhando para um problema?"

🧩 Solução

Uma aplicação fullstack que centraliza e expõe a saúde de projetos através de indicadores claros e atualizações dinâmicas.

Principais funcionalidades
Dashboard com status:
🟢 Saudável
🟡 Atenção
🔴 Crítico
CRUD de projetos
Registro de health checks
Validação de formulários
Feedback visual baseado em estado da aplicação
Atualização reativa da interface

🏗️ Arquitetura

A aplicação segue uma arquitetura desacoplada, com responsabilidades bem definidas:

Frontend (Vercel)
   ↓
Backend API (Render)
   ↓
Database (Supabase - PostgreSQL)
Decisões técnicas
Separação de camadas → facilita manutenção e escalabilidade
Backend stateless → ideal para deploy em plataformas como Render
Banco gerenciado (Supabase) → reduz overhead operacional
Frontend desacoplado → deploy independente e rápido (Vercel)
⚙️ Stack
Frontend
React + TypeScript
Componentização orientada a domínio
Hooks customizados
CSS Modules
Gerenciamento de estados de UI:
loading
erro
vazio
Backend
Node.js
API REST
Estrutura baseada em camadas (controller → service → repository)
Banco de dados
PostgreSQL (Supabase)
Modelagem relacional simples e objetiva
Uso de UUID como chave primária
Infraestrutura / Deploy
Frontend: Vercel
Backend: Render
Database: Supabase
🔍 Pontos de Engenharia

Esse projeto não foca apenas em funcionalidade, mas em práticas relevantes para ambientes reais:

✔️ Estados reais da aplicação

Tratamento explícito de:

loading
erro de rede
ausência de dados
✔️ UX orientada a decisão
Cores e status pensados para leitura rápida
Redução de ambiguidade visual
✔️ Consumo de API resiliente
Estrutura preparada para falhas
Separação de responsabilidades no frontend
✔️ Escalabilidade inicial considerada
Backend desacoplado
Banco gerenciado
Deploy independente por camada