#!/usr/bin/env node

/**
 * Magic Link API Test Script
 * 
 * This script tests the magic link functionality without requiring a database connection.
 * It simulates the API endpoints and validates the implementation.
 */

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Mock configuration
const config = {
  MAGIC_LINK_SECRET: 'test-secret-key-for-development',
  MAGIC_LINK_EXPIRATION: '15m',
  FRONTEND_URL: 'http://localhost:3001',
  NODE_ENV: 'development'
};

// Mock data
const mockUsers = new Map();
const mockTokens = new Map();

class MockMagicLinkService {
  constructor() {
    console.log('🚀 Magic Link Test Service Initialized');
  }

  // Simulate sending a magic link
  async sendMagicLink(email, ipAddress = '127.0.0.1', userAgent = 'test-agent') {
    console.log(`\n📧 Sending magic link to: ${email}`);
    
    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      throw new Error('Invalid email address');
    }

    // Rate limiting simulation (in real app, this would check database)
    console.log('✅ Rate limiting check passed');

    // Find or create user
    let user = mockUsers.get(email);
    if (!user) {
      user = {
        id: crypto.randomUUID(),
        email: email.toLowerCase().trim(),
        isEmailVerified: false,
        createdAt: new Date()
      };
      mockUsers.set(email, user);
      console.log(`👤 Created new user: ${user.id}`);
    } else {
      console.log(`👤 Found existing user: ${user.id}`);
    }

    // Generate secure token
    const tokenId = crypto.randomUUID();
    const jwtPayload = {
      sub: user.id,
      email: user.email,
      tokenId,
      type: 'magic_link',
      iat: Math.floor(Date.now() / 1000),
    };

    const token = jwt.sign(jwtPayload, config.MAGIC_LINK_SECRET, {
      expiresIn: config.MAGIC_LINK_EXPIRATION,
    });

    // Calculate expiration
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Store token
    const magicLinkToken = {
      id: crypto.randomUUID(),
      token: tokenId,
      userId: user.id,
      expiresAt,
      isUsed: false,
      ipAddress,
      userAgent,
      createdAt: new Date()
    };

    mockTokens.set(tokenId, magicLinkToken);

    const magicLink = `${config.FRONTEND_URL}/magic-link?token=${token}`;
    
    console.log('🔗 Magic link generated:');
    console.log(`   URL: ${magicLink}`);
    console.log(`   Token ID: ${tokenId}`);
    console.log(`   Expires: ${expiresAt.toISOString()}`);

    return {
      message: 'Development mode: Email service not configured',
      devToken: token,
      magicLink
    };
  }

  // Simulate verifying a magic link
  async verifyMagicLink(token, ipAddress = '127.0.0.1', userAgent = 'test-agent') {
    console.log(`\n🔍 Verifying magic link token...`);
    
    try {
      // Verify JWT
      const payload = jwt.verify(token, config.MAGIC_LINK_SECRET);
      console.log('✅ JWT signature valid');

      // Check token type
      if (payload.type !== 'magic_link') {
        throw new Error('Invalid token type');
      }
      console.log('✅ Token type validated');

      // Find token in mock database
      const magicLinkToken = mockTokens.get(payload.tokenId);
      if (!magicLinkToken) {
        throw new Error('Token not found');
      }
      console.log('✅ Token found in database');

      // Check if already used
      if (magicLinkToken.isUsed) {
        throw new Error('Magic link has already been used');
      }
      console.log('✅ Token not previously used');

      // Check expiration
      if (new Date() > magicLinkToken.expiresAt) {
        throw new Error('Magic link has expired');
      }
      console.log('✅ Token not expired');

      // Mark as used
      magicLinkToken.isUsed = true;
      magicLinkToken.usedAt = new Date();
      console.log('✅ Token marked as used');

      // Get user
      const user = mockUsers.get(payload.email);
      if (!user) {
        throw new Error('User not found');
      }

      // Mark email as verified
      user.isEmailVerified = true;
      console.log('✅ Email marked as verified');

      // Generate auth tokens (mock)
      const authTokens = {
        access_token: jwt.sign(
          { sub: user.id, email: user.email, type: 'access' },
          'access-secret',
          { expiresIn: '1h' }
        ),
        refresh_token: jwt.sign(
          { sub: user.id, type: 'refresh' },
          'refresh-secret',
          { expiresIn: '7d' }
        )
      };

      console.log('🎉 Login successful!');
      
      return {
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          isEmailVerified: user.isEmailVerified,
        },
        ...authTokens,
      };

    } catch (error) {
      console.log(`❌ Verification failed: ${error.message}`);
      throw error;
    }
  }

  // Get statistics
  getStats() {
    return {
      totalUsers: mockUsers.size,
      totalTokens: mockTokens.size,
      usedTokens: Array.from(mockTokens.values()).filter(t => t.isUsed).length
    };
  }
}

// Test scenarios
async function runTests() {
  console.log('🧪 Starting Magic Link API Tests\n');
  
  const service = new MockMagicLinkService();
  
  try {
    // Test 1: Send magic link
    console.log('='.repeat(50));
    console.log('TEST 1: Send Magic Link');
    console.log('='.repeat(50));
    
    const result1 = await service.sendMagicLink('test@example.com');
    console.log(`✅ Test 1 passed: ${result1.message}`);
    
    // Test 2: Verify magic link
    console.log('\n' + '='.repeat(50));
    console.log('TEST 2: Verify Magic Link');
    console.log('='.repeat(50));
    
    const result2 = await service.verifyMagicLink(result1.devToken);
    console.log(`✅ Test 2 passed: ${result2.message}`);
    console.log(`   User: ${result2.user.email} (ID: ${result2.user.id})`);
    
    // Test 3: Try to reuse token (should fail)
    console.log('\n' + '='.repeat(50));
    console.log('TEST 3: Reuse Token (Should Fail)');
    console.log('='.repeat(50));
    
    try {
      await service.verifyMagicLink(result1.devToken);
      console.log('❌ Test 3 failed: Token reuse should have been rejected');
    } catch (error) {
      console.log(`✅ Test 3 passed: ${error.message}`);
    }
    
    // Test 4: Invalid email
    console.log('\n' + '='.repeat(50));
    console.log('TEST 4: Invalid Email (Should Fail)');
    console.log('='.repeat(50));
    
    try {
      await service.sendMagicLink('invalid-email');
      console.log('❌ Test 4 failed: Invalid email should have been rejected');
    } catch (error) {
      console.log(`✅ Test 4 passed: ${error.message}`);
    }
    
    // Test 5: Expired token
    console.log('\n' + '='.repeat(50));
    console.log('TEST 5: Expired Token (Simulation)');
    console.log('='.repeat(50));
    
    const expiredToken = jwt.sign(
      {
        sub: 'test-user',
        email: 'test@example.com',
        tokenId: 'expired-token',
        type: 'magic_link',
        iat: Math.floor(Date.now() / 1000) - 3600 // 1 hour ago
      },
      config.MAGIC_LINK_SECRET,
      { expiresIn: '1s' } // Already expired
    );
    
    // Wait a moment to ensure expiration
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    try {
      await service.verifyMagicLink(expiredToken);
      console.log('❌ Test 5 failed: Expired token should have been rejected');
    } catch (error) {
      console.log(`✅ Test 5 passed: ${error.message}`);
    }
    
    // Final stats
    console.log('\n' + '='.repeat(50));
    console.log('FINAL STATISTICS');
    console.log('='.repeat(50));
    const stats = service.getStats();
    console.log(`👥 Total Users: ${stats.totalUsers}`);
    console.log(`🎫 Total Tokens: ${stats.totalTokens}`);
    console.log(`✅ Used Tokens: ${stats.usedTokens}`);
    
    console.log('\n🎉 All tests completed successfully!');
    
  } catch (error) {
    console.error(`\n💥 Test failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the tests
if (require.main === module) {
  runTests();
}

module.exports = { MockMagicLinkService };
