const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

require('dotenv').config();

async function main() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Conectando ao banco...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.substring(0, 50) + '...');
    
    const contas = await prisma.conta.findMany();
    console.log('Total de usuarios:', contas.length);
    
    for (const c of contas) {
      console.log('- ID:', c.id, '| Email:', c.email, '| Senha hash:', c.senha.substring(0, 15) + '...');
    }
    
    // Testar senha do usuario teste
    const testEmail = 'teste@teste.com';
    const user = await prisma.conta.findFirst({ where: { email: testEmail } });
    if (user) {
      const isValid = await bcrypt.compare('teste123', user.senha);
      console.log('\nTeste de senha para', testEmail, ':', isValid ? '✅ VALIDA' : '❌ INVALIDA');
      
      if (!isValid) {
        // Recriar com senha correta
        console.log('\nRecriando usuario com senha correta...');
        const newHash = await bcrypt.hash('teste123', 10);
        await prisma.conta.update({
          where: { id: user.id },
          data: { senha: newHash }
        });
        console.log('✅ Senha atualizada!');
      }
    } else {
      console.log('\nUsuario', testEmail, 'nao encontrado. Criando...');
      const newHash = await bcrypt.hash('teste123', 10);
      await prisma.conta.create({
        data: {
          nome: 'Usuario Teste',
          email: testEmail,
          senha: newHash
        }
      });
      console.log('✅ Usuario criado!');
    }
    
  } catch (e) {
    console.error('Erro:', e.message);
    console.error(e.stack);
  } finally {
    await prisma.$disconnect();
  }
}

main();
