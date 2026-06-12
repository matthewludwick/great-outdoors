const forum_categories = [
    {category: 'Hiking Gear and Reviews', description:'Discuss gear and share what is in your bag!'},
    {category: 'Help, Questions & Feedback', description: 'Phone a friend, ask for insight and provide some tips!'},
    {category: 'New Member Introductions', description: 'Introduce yourself to the community!'},
    {category: 'Stories from the Trailhead', description: 'Left the trail with an interesting experience and a story to tell? Share with the Great Outdoors community!'},
    {category: 'Photo Gallery', description: 'Posting on IG not covering it anymore? Drop your best hiking pics here.'},
    {category: 'Off Topic', icon: '🌿', description: 'Discuss and share your thoughts outside of trails and hiking.'}
]

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ic-users').innerHTML = sizeIcon('users',56);


document.getElementById('principles-grid').innerHTML = forum_categories.map(f => (`
    <div class="principle">
      <div class="head">
        <h3><a href>${escapeHtml(f.category)}</a href></h3>
      </div>
      <p>${escapeHtml(f.description)}</p>
    </div>`)).join('');
    
});