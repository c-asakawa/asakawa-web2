// service that serves up static content
app.service('contentService', function() {

    var contactInfo = {
        phone: '503-724-7569',
        email: 'chris@asakawa.me',
    }

    var terminalContent = [
        {
            input: 'whoami',
            show: true,
            outputList: [ 
                { line: 'Hi, my name is Chris Asakawa.', show: false }, 
                { line: 'I\'m a software developer.', show: false },
            ],
        },
        {
            input: 'cat welcome.txt',
            show: false,
            outputList: [ 
                { line: '***********************************', show: false }, 
                { line: '*  This portfolio contains:       *', show: false }, 
                { line: '* ------------------------------- *', show: false },
                { line: '*  - Academic Achievements        *', show: false }, 
                { line: '*  - Personal Projects            *', show: false }, 
                { line: '*  - Open Source Projects         *', show: false }, 
                { line: '*  - Freelance Work               *', show: false }, 
                { line: '***********************************', show: false }, 
            ],
        },
        {
            input: 'clear',
            show: false,
            outputList: [ 
                { line: '', show: false }, 
            ],
        }
    ]
    var bio = {
        title: 'Why I Do What I Do',
        body: 'Something that will always interest me is making things.        \
               Which why I love what I do, there is nothing more rewarding then developing    \
               software to solve complex problems. Writing code makes me feel empowered, to   \
               create something useful out of nothing. The potential and innovations          \
               of software never ceases to amaze me, and I look forward to learning more in   \
               my future in programming.'
    
    }

    var tiles = [
        { 
            header: 'Academia',
            imagePath: 'img/academia.png',
            intro: 'Academic Achievements at Portland State University and Portland Community College'
        },
        { 
            header: 'Projects',
            imagePath: 'img/projects.png',
            intro: 'Personal Projects, '
        },
        { 
            header: 'Open Source',
            imagePath: 'img/opensource.png',
            intro: 'Open source software development projects'
        },
        {
            header: 'Freelance',
            imagePath: 'img/freelance.png',
            intro: 'Web development freelance'
        },

    ]

    var socialMedia = {
        linkedin: {
            label: 'LinkedIn',
            iconClass: 'fa fa-linkedin',
            url: 'https://www.linkedin.com/in/asakawa-11007937/'
        },
        github: {
            label: 'GitHub',
            iconClass: 'fa fa-github-alt',
            url: 'https://github.com/c-asakawa'
        },
        facebook: {
            label: 'Facebook',
            iconClass: 'fa fa-facebook',
            url: 'https://www.facebook.com/chris.asa.1'
        },
        instagram: {
            label: 'Instagram',
            iconClass: 'fa fa-instagram',
            url: 'https://www.instagram.com/chris.asakawa/?hl=en'
        }

    }
    var phoneContent = {
        header: 'Call Me Directly',
        body: 'Please leave me a voicemail if I don\'t answer'
    }
    var emailContent = {
        header: 'Send Me A Message',
        body: ''
    }
    var resumeContent = {
        header: 'Resume',
        body: '',
    }
    var academiaContent = {
        header: 'Academia',
        body: '',
        psu: {
            logo: 'img/psuBanner.png',
            summary: 'I graduated from PSU with a bachelors degree in computer science in the summer of 2016.',
            listHeader: 'PSU Course List:',
            classList: [
                'Data Structures',
                'Programming Systems',
                'Discrete Structures I & II',
                'Software Engineering',
                'Computational Structures',
                'Operating Systems',
                'Computer Hardware',
                'Language & Compiler Design I & II',
                'Databases',
                'Computer Vision',
                'Network Security',
                'Open Source Software',
                'Capstone I & II',
                'Open Source Software',
                'Software Development Ethics',
            ]
        },
        pcc: {
            logo: 'img/pccBanner.png',
            summary: 'At PCC I was award an associates in liberal arts.',
            listHeader: 'PCC Course List:',
            classList: [
                'Physics I, II, & III',
                'Calculus I, II, & III',
                'Statistics',
                'Discrete Mathematics',
                'Linear Algebra',
                'Technical Writing',
                'Public Speaking',
                'General Psychology I & II',
                'General Sociology I & II',
                'General Political Science I & II',
                'Philosophy Critical Thinking',
                'Philosophy of Pseudoscience',
                'Philosophy of Religion',
                'Philosophy of Business',
                'Environmental Science',
                'Perspectives on Terrorism',
            ]
        }
    }

    var projectsContent = {
        header: 'Projects', 
        body: '',
        skateboardHeader: 'Custom Electric Skateboard',
        skateboardSummary: 'I started designing and prototyping electric skateboard builds back ' +
                           'in 2014, and since then I have created five separate builds. My most ' + 
                           'recent build gets a range of about 10 miles, and has a top speed of 41 mph.',
        skateboardBuilds: [
            { tabLabel: 'v5', title: 'Build Version 5 - Current', imageList: [ 'img/skateboardBuilds/6.png', 'img/skateboardBuilds/7.png'] },
            { tabLabel: 'v4', title: 'Build Version 4 - 2016', imageList: [ 'img/skateboardBuilds/5.png' ] },
            { tabLabel: 'v3', title: 'Build Version 3 - 2015', imageList: [ 'img/skateboardBuilds/3.png', 'img/skateboardBuilds/4.png' ] },
            { tabLabel: 'v2', title: 'Build Version 2 - 2014', imageList: [ 'img/skateboardBuilds/2.png' ] },
            { tabLabel: 'v1', title: 'Build Version 1 - 2014', imageList: [ 'img/skateboardBuilds/1.png' ] },
        ],
        lifeAlertHeader: 'Localized Life Alert System',
        lifeAlert: 'This project is currently a work in progress. The purpose of this project is to ' +
                   'be a localized life alert system. This raspberry pi syncs syncs up to a key fob ' +
                   'with multiple buttons. Currently there are two functions: the first is sounding ' +
                   'off a very loud high pitched buzzer, the second function is set up to send out '  +
                   'an emergency text message to predetermined hard coded phone numbers.'
    }
    var opensourceContent = {
        header: 'Open Source',
        body: '',
    }
    var freelanceContent = {
        header: 'Freelance',
        body: '',
    }

    var copyRightInfo = 'Copyright © ' + getYear() + ' Chris Asakawa';




    function getYear() {
        var date = new Date()
        return date.getFullYear();
    }

    this.getContactInfo = function() { return contactInfo; }
    this.getTerminalContent = function() { return terminalContent; }
    this.getBioContent = function() { return bio; }
    this.getSocialMedia = function() { return socialMedia; }
    this.getPhoneContent = function() { return phoneContent; }
    this.getEmailContent = function() { return emailContent; }
    this.getResumeContent = function() { return resumeContent; }
    this.getTiles = function() { return tiles; }
    this.getCopyRightInfo = function() { return copyRightInfo; }
    this.getAcademiaContent = function() { return academiaContent; }
    this.getProjectsContent = function() { return projectsContent; }
    this.getOpensourceContent = function() { return opensourceContent; }
    this.getFreelanceContent = function() { return freelanceContent; }
});
