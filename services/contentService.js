// service that serves up static content
app.service('contentService', function() {

    var contactInfo = {
        phone: '503-724-7569',
        email: 'chris@asakawa.me',
    }

    var terminalContent = [
        {
            input: 'whoami',
            delay: 2000,
            show: true,
            outputList: [ 
                { line: 'Hi, my name is Chris Asakawa.', show: false }, 
                { line: 'I\'m a software developer.', show: false },
            ],
        },
        {
            input: 'cat welcome.txt',
            delay: 5000,
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
        }
    ]
    var content = {
        bio: {
            title: 'Why I Do What I Do',
            body: 'Something that will always interest me is making things.        \
                   Which why I love what I do, there is nothing more rewarding then developing    \
                   software to solve complex problems. Writing code makes me feel empowered, to   \
                   create something useful out of nothing. The potential and innovations          \
                   of software never ceases to amaze me, and I look forward to learning more in   \
                   my future in programming.'
        }
    }

    var tiles = [
        { 
            header: 'Academia',
            imagePath: 'img/academia.png',
            intro: 'Academic Achievements at Portland State University and Portland Community College'
        },
        { 
            header: 'Projects',
            imagePath: 'img/academia.png',
            intro: 'Personal Projects, '
        },
        { 
            header: 'Open Source',
            imagePath: 'img/academia.png',
            intro: 'Open source software development projects'
        },
        {
            header: 'Freelance',
            imagePath: 'img/academia.png',
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

    this.getContactInfo = function() {
        return contactInfo;
    }
    this.getTerminalContent = function() {
        return terminalContent;
    }
    this.getContent = function() {
        return content;
    }
    this.getSocialMedia = function() {
        return socialMedia;
    }
    this.getPhoneContent = function() {
        return phoneContent;
    }
    this.getEmailContent = function() {
        return emailContent;
    }
    this.getResumeContent = function() {
        return resumeContent;
    }
    this.getTiles = function() {
        return tiles;
    }
});
