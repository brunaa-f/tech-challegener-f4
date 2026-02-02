require('dotenv').config({ path: './.env' });

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createTestUser() {
  const hashedPassword = await bcrypt.hash('teste123', 10);
  
  try {
    // Verificar se já existe
    const existingUser = await prisma.conta.findFirst({
      where: { email: 'teste@teste.com' }
    });
    
    if (existingUser) {
      console.log('✅ Usuario já existe!');
      console.log('📧 Email: teste@teste.com');
      console.log('🔐 Senha: teste123');
      return;
    }
    
    const user = await prisma.conta.create({
      data: {
        nome: 'Usuario Teste',
        email: 'teste@teste.com',
        senha: hashedPassword,
      },
    });
    
    await prisma.saldo.create({
      data: {
        contaId: user.id,
        valor: 1000.00,
      },
    });
    
    console.log('✅ Usuario criado com sucesso!');
    console.log('📧 Email: teste@teste.com');
    console.log('🔐 Senha: teste123');
  } catch (e) {
    console.error('Erro:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
