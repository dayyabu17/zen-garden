const API_URL = 'http://localhost:5000/api/art';

// Sample artwork data matching the Art schema
const sampleArt = {
  title: 'Test Flow Pattern',
  paths: [
    {
      points: [
        { x: 100, y: 150 },
        { x: 120, y: 160 },
        { x: 140, y: 155 },
        { x: 160, y: 170 }
      ],
      color: '#FF6B6B',
      brushSize: 5
    },
    {
      points: [
        { x: 200, y: 250 },
        { x: 220, y: 240 },
        { x: 240, y: 255 }
      ],
      color: '#4ECDC4',
      brushSize: 8
    }
  ]
};

async function testBackend() {
  console.log('🧪 Starting Backend Test...\n');

  // Test 1: POST - Save artwork
  try {
    console.log('📤 Sending POST request to save artwork...');
    const postResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sampleArt)
    });

    if (!postResponse.ok) {
      throw new Error(`HTTP error! status: ${postResponse.status}`);
    }

    const savedArt = await postResponse.json();
    console.log('✅ SUCCESS: Artwork saved!');
    console.log('   ID:', savedArt._id);
    console.log('   Title:', savedArt.title);
    console.log('   Paths:', savedArt.paths.length);
    console.log('   Created:', savedArt.createdAt);
    console.log('');
  } catch (error) {
    console.error('❌ ERROR saving artwork:', error.message);
    console.log('');
  }

  // Test 2: GET - Fetch all artworks
  try {
    console.log('📥 Sending GET request to fetch all artworks...');
    const getResponse = await fetch(API_URL);

    if (!getResponse.ok) {
      throw new Error(`HTTP error! status: ${getResponse.status}`);
    }

    const artworks = await getResponse.json();
    console.log('✅ SUCCESS: Artworks retrieved!');
    console.log(`   Total artworks in database: ${artworks.length}`);
    console.log('');

    if (artworks.length > 0) {
      console.log('📋 Latest artworks:');
      artworks.slice(0, 3).forEach((art, index) => {
        console.log(`   ${index + 1}. "${art.title}" - ${art.paths.length} paths (${new Date(art.createdAt).toLocaleString()})`);
      });
    }
  } catch (error) {
    console.error('❌ ERROR fetching artworks:', error.message);
  }

  console.log('\n✨ Test complete!\n');
}

// Run the test
testBackend();
